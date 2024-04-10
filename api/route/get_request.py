# заросы на отрисовку
import sys
sys.path.append('../')

from core import *
from instance.models import *

# вся корзина
@api.route('/galary', methods=["GET"])
def GetGalary():
    # на вход ничего не надо
    galary = Stuff.query.all()
    resp = []

    for el in galary:
        row = {
            'id': el.id,
            'name': el.name,
            'photo': el.photo,
            'price': el.price,
            'size': el.size,
            'mass': el.mass,
            'description': el.description,
            'producer': el.producer
        }
        resp.append(row)
    
    return resp

# пользователь перешол в свою корзину
@api.route('/cart', methods=["GET"])
@jwt_required()
def GetCart():
    # на вход ничего не надо
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        resp = {
            "errCode": 2,
            "errString": "вы продовец, у вас нет корзины"
        }
        return resp, 403
    
    resp = []
    
    userID = User.query.filter_by(name=user).first().id
    # orders = Orders.query.join(Orders, (Orders.status == 'incart')&(Orders.user == userID)).all()
    orders = Orders.query.filter(Orders.user==userID).all()

    for el in orders:
        if el.status == 'in cart':
            item = Stuff.query.filter_by(id=el.stuff).first()
            row = {
                'id': item.id,
                'name': item.name,
                'photo': item.photo,
                'price': item.price,
                'size': item.size,
                'mass': item.mass,
                'description': item.description,
                'producer': item.producer
            }
            resp.append(row)

    return resp

# все пвз, если знаем прововца
@api.route('/pvz/<producer>', methods=['GET'])
def GetPVZ(producer):
    # на вход название продовца
    pvz = PVZ.query.filter_by(producer=producer).all()
    resp = []

    for el in pvz:
        row = {
            'id': el.id,
            'producer': el.producer,
            'city': el.city,
            'address': el.address
        }
        resp.append(row)
    
    return resp

# корзина от леца продовца
@api.route('/galaryProducer', methods=["GET"])
@jwt_required()
def GetStuff():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    galary = Stuff.query.filter_by(producer=GetID(user)).all()
    resp = []

    for el in galary:
        row = {
            'id': el.id,
            'name': el.name,
            'photo': el.photo,
            'price': el.price,
            'size': el.size,
            'mass': el.mass,
            'description': el.description,
            'producer': el.producer
        }
        resp.append(row)
    
    return resp

# пвз от леца продовца
@api.route('/pvz/Producer', methods=["GET"])
@jwt_required()
def GetMiPVZ():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    pvz = Stuff.query.filter_by(producer=GetID(user)).all()
    resp = []

    for el in pvz:
        row = {
            'id': el.id,
            'producer': el.producer,
            'city': el.city,
            'address': el.address,
            'time_from': el.time_from,
            'price_from': el.price_from,
            'distance_from': el.distance_from
        }
        resp.append(row)
    
    return resp

# склады от леца продовца
@api.route('/Storehouse/Producer', methods=['GET'])
@jwt_required()
def GetStorehouse():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    storehouse = Storehouse.query.filter_by(producer=GetID(user)).all()
    resp = []

    for el in storehouse:
        row = {
            'id': el.id,
            'producer': el.producer,
            'city': el.city
        }
        resp.append(row)
    
    return resp