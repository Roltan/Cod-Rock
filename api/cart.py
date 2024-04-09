# работа с корзиной и заказом

from core import *
from models import *

@api.route('/dobavlenie', methods=["PUT"])
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
    
    order = Orders.query.filter_by(id=id).first()
    order.status = 'on way'
    order.storehouse = storehouse
    order.pvz = pvz
    order.initial_city = initial_city
    order.final_city = final_city
    order.way = way
    db.session.commit()
    
    return 'запомнил'


# добовление одного пути
def UpdateWay(respWay, processed_city, map, storehouse, i, j):
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

# поиск путей
def CreateWay(respWay, storehouse, iter):
    while iter>0:
        N = len(respWay)
        for i in range(N):
            # фильтрация закончиных от незаконченых
            if respWay[i]["status"]=="dead end" or respWay[i]["status"]=="finish":
                continue

            countWay = len(respWay)
            processed_city = respWay[i]["city"][-1]
            map = Map.query.filter((Map.initial_city==processed_city)|(Map.final_city==processed_city)).all()

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
            for j in range(1, countNewWay):
                UpdateWay(respWay, processed_city, map, storehouse, countWay+j, j)
            # return {"respWay":respWay,"len":len(respWay)}
        print(iter)
        iter-=1

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
    for el in map:
        respWay.append(
            {
                "city": [el.final_city, el.initial_city],
                "id": [el.id],
                "time": el.time_way,
                "price": el.price_way,
                "distance": el.distance_way,
                "status": "in way"
            }
        )
    map = Map.query.filter(Map.initial_city==final_city).all()
    for el in map:
        respWay.append(
            {
                "city": [el.initial_city, el.final_city],
                "id": [el.id],
                "time": el.time_way,
                "price": el.price_way,
                "distance": el.distance_way,
                "status": "in way"
            }
        )

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
    CreateWay(respWay, storehouse, iter)

    
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
    while not resp:
        CreateWay(respWay, storehouse, 1)

    # ищу самые самые
    minTimeWay = [resp[0],resp[0],resp[0]]
    minPriceWay = [resp[0],resp[0],resp[0]]
    minDistanceWay = [resp[0],resp[0],resp[0]]

    for top in range(3):
        minTime = resp[0]["time"]
        minPrice = resp[0]["price"]
        minDistance = resp[0]["distance"]

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
        "min time": minTimeWay,
        'min price': minPriceWay,
        'min distance': minDistanceWay
    }
    return fast
                
