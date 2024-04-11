# работа с корзиной и заказом
import sys
sys.path.append('../')

from core import *
from instance.models import *

@api.route('/addToCart', methods=["PUT"])
@jwt_required()
def AddToCart():
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        resp = {
            "errCode": 2,
            "errString": "вы продовец, у вас нет корзины"
        }
        return resp, 403
    
    try:
        # можно имя товара, можно его id
        stuff = request.json['stuff']
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401
    
    if type(stuff) == str:
        stuff = Stuff.query.filter_by(name=stuff).first().id
    
    userID = User.query.filter_by(name=user).first().id
    row = Orders(user=userID, stuff=stuff, status='in cart')
    db.session.add(row)
    db.session.commit()

    return 'добавил'

# пользователь выбрал дорогу и подтвердил заказ
@api.route('/acceptOrder', methods=["POST"])
@jwt_required()
def AcceptOrder():
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        resp = {
            "errCode": 2,
            "errString": "вы продовец, у вас нет корзины"
        }
        return resp, 403
    
    try:
        id = request.json["id"]
        pvz = request.json["pvz"]
        storehouse = request.json["storehouse"]
        initial_city = request.json["initial_city"]
        final_city = request.json["final_city"]
        way = request.json["way"]
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401
    
    order = Orders.query.filter((Orders.stuff==id)&(Orders.user==GetID(user))).first()
    order.status = 'in way'
    order.storehouse = storehouse
    order.pvz = pvz
    order.initial_city = initial_city
    order.final_city = final_city
    order.way = way
    db.session.commit()
    
    return 'запомнил'


# проверка путей на разрешонный транспорт
def CheckWays(query, transportArr):
    resp = []
    for el in query:
        if el.transport in transportArr:
            resp.append(el)
    return resp

# добовление одного пути
def UpdateWay(respWay, processed_city, map, storehouse, i, j):
    try:
        # проверки чтоб понять какой из городов записывать
        if map[j].initial_city == processed_city:
            # проверка не приехал ли туда где уже был
            if map[j].final_city in respWay[i]["city"] or map[j].id in respWay[i]["id"]:
                respWay[i]["status"] = 'dead end'
                return
            respWay[i]["city"].append(map[j].final_city)
            if map[j].final_city in storehouse: # проверяю есть ли склад в этом городе
                respWay[i]["status"] = 'finish' # меняю статус пути на финиш
        elif map[j].final_city == processed_city:
            # проверка не приехал ли туда где уже был
            if map[j].initial_city in respWay[i]["city"] or map[j].id in respWay[i]["id"]:
                respWay[i]["status"] = 'dead end'
                return
            respWay[i]["city"].append(map[j].initial_city)
            if map[j].initial_city in storehouse: # проверяю есть ли склад в этом городе
                respWay[i]["status"] = 'finish' # меняю статус пути на финиш
        # добовляю другие данные пути
        respWay[i]["id"].append(map[j].id)
        respWay[i]["time"] += map[j].time_way 
        respWay[i]["price"] += map[j].price_way
        respWay[i]["distance"] += map[j].distance_way
    except:
        pass

# поиск путей
def CreateWay(respWay, storehouse, transport, iter):
    while iter>0:
        N = len(respWay)
        for i in range(N):
            # фильтрация закончиных от незаконченых
            if respWay[i]["status"]=="dead end" or respWay[i]["status"]=="finish":
                continue

            countWay = len(respWay)
            processed_city = respWay[i]["city"][-1]
            map = Map.query.filter((Map.initial_city==processed_city)|(Map.final_city==processed_city)).all()
            map = CheckWays(map, transport)

            # проверка на тупик
            if len(map) == 1:
                respWay[i]["status"] = "dead end"
                continue
            countNewWay = len(map)-1
            
            # создаю объекты для ответвлений
            if countNewWay > 2:
                for k in range(countNewWay):
                    respWay.append(copy.deepcopy(respWay[i]))

            # заполняю текущий путь
            UpdateWay(respWay, processed_city, map, storehouse, i, 0)

            # заполняю путу которые появились изза развилок
            for j in range(countNewWay):
                UpdateWay(respWay, processed_city, map, storehouse, countWay+j, j)
            # return {"respWay":respWay,"len":len(respWay)}
        print(iter)
        iter-=1

# меняю пути из данных для расчёта в данные для таблиц
def PrepWay(wayArr, pvz):
    resp = []
    for way in wayArr:
        iterResp = {
            "pvz": pvz.id,
            "storhous": Storehouse.query.filter((Storehouse.city==way["city"][-1])&(Storehouse.producer==pvz.producer)).first().id,
            "initial_city": way["city"][0],
            "final_city": way["city"][-1],
            "wayList": way["city"],
            "way": '',
            "time": way.time_way,
            "price": way.price_way,
            "distance": way.distance_way,
        }
        wayString = ''
        for i in range(len(way["id"])-1):
            wayString += str(way["id"][i])+' '
        wayString += str(way["id"][-1])
        iterResp['way']=wayString
        resp.append(iterResp)
    return resp

# ищу дороги
@api.route('/getWay', methods=["POST"])
@jwt_required()
def GetWay():
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        resp = {
            "errCode": 2,
            "errString": "вы продовец, вам не дам пути"
        }
        return resp, 403
    
    try:
        # id пвз который выбрал пользователь
        pvz = request.json["pvz"]
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401
    
    # принимаю типы транспорта
    transport = ['car', 'air', 'ship']
    try:
        car = request.json["car"]
        if car == False:
            transport[0] = ''
    except:
        pass
    try:
        air = request.json["air"]
        if air == False:
            transport[1] = ''
    except:
        pass
    try:
        ship = request.json["ship"]
        if ship == False:
            transport[2] = ''
    except:
        pass

    pvz = PVZ.query.filter_by(id=pvz).first()
    final_city = pvz.city
    if not final_city:
        resp = {
            "errCode": 3,
            "errString": "нет такого пвз"
        }
        return resp, 404
    
    respWay = []

    # создал объекты для записи маршрутов
    map = Map.query.filter(Map.final_city==final_city).all()
    map = CheckWays(map, transport)
    for el in map:
        respWay.append({
            "city": [el.final_city, el.initial_city],
            "id": [el.id],
            "time": el.time_way,
            "price": el.price_way,
            "distance": el.distance_way,
            "status": "in way"
        })
    map = Map.query.filter(Map.initial_city==final_city).all()
    map = CheckWays(map, transport)
    for el in map:
        respWay.append({
            "city": [el.initial_city, el.final_city],
            "id": [el.id],
            "time": el.time_way,
            "price": el.price_way,
            "distance": el.distance_way,
            "status": "in way"
        })

    # если нет ни одной дороги
    if len(respWay) == 0:
        return {
            "err": 5,
            "errString": "у нас не получилось найти для вас маршрут"
        }, 404

    # список складов компании
    storehouseTable = Storehouse.query.filter_by(producer=pvz.producer).all()
    storehouse = []
    for el in storehouseTable:
        storehouse.append(el.city)

    # проверка прехали ли мы сразу в нужное место
    for el in respWay:
        if el["city"][-1] in storehouse:
            el["status"] = "finish"

    # самый сок
    iter = 4
    CreateWay(respWay, storehouse, transport, iter)

    
    # обработчик путей

    # оставил только законченные
    resp = []
    for el in respWay:
        if el["status"]=="finish":
            # добовляю данне о пвз
            el["time"] += pvz.time_from
            el["price"] += pvz.price_from
            el["distance"] += pvz.distance_from
            resp.append(el)
    
    # если ниодной законченой дороги не появилось
    trying = 0
    while not resp:
        CreateWay(respWay, storehouse, transport, 1)
        trying+=1
        if trying == 10:
            return {
                "err": 5,
                "errString": "у нас не получилось найти для вас маршрут"
            }, 404

    # ищу самые самые
    minTimeWay = [{},{},{}]
    minPriceWay = [{},{},{}]
    minDistanceWay = [{},{},{}]

    for top in range(3):
        minTime = math.inf
        minPrice = math.inf
        minDistance = math.inf

        for el in resp:
            if el["time"] < minTime and el not in minTimeWay:
                minTimeWay[top] = el
                minTime = el["time"]
            if el["price"] < minPrice and el not in minPriceWay:
                minPriceWay[top] = el
                minPrice = el["price"]
            if el["distance"] < minDistance and el not in minDistanceWay:
                minDistanceWay[top] = el
                minDistance = el["distance"]

    fast = {
        "minTime": PrepWay(minTimeWay, pvz),
        'minPrice': PrepWay(minPriceWay, pvz),
        'minDistance': PrepWay(minDistanceWay, pvz)
    }
    return fast
