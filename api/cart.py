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

@api.route('/getWay')
@jwt_required()
def GetWay():
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        resp = {
            "errCode": 2,
            "errString": "вы продовец, у вас нет корзины"
        }
        return resp, 403
    
    