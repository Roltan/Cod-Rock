# заросы на отрисовку

from core import *
from models import *

@api.route('/galary', methods=["GET"])
def GetGalary():
    # на вход ничего не надо
    galary = Stuff.query.all()
    resp = {
        "date": []
    }

    for el in galary:
        row = {
            'id': el.id,
            'name': el.name,
            'foto': el.foto,
            'price': el.price,
            'size': el.size,
            'mass': el.mass,
            'description': el.description,
            'producer': el.producer
        }
        resp["date"].append(row)
    
    return resp

@api.route('/cart', methods=["GET"])
@jwt_required()
def GetCart():
    # на вход ничего не надо
    user = get_jwt()["sub"]
    if GetRole(user) == 'producer':
        return 'вы продавец, у вас нет корзины', 401
    
    resp = {
        "date": []
    }
    
    userID = User.query.filter_by(name=user).first().id
    # orders = Orders.query.join(Orders, (Orders.status == 'incart')&(Orders.user == userID)).all()
    orders = Orders.query.filter(Orders.user==userID).all()

    for el in orders:
        if el.status == 'incart':
            item = Stuff.query.filter_by(id=el.stuff).first()
            row = {
                'id': item.id,
                'name': item.name,
                'foto': item.foto,
                'price': item.price,
                'size': item.size,
                'mass': item.mass,
                'description': item.description,
                'producer': item.producer
            }
            resp["date"].append(row)

    return resp

@api.route('/pvz/<producer>',methods=['GET'])
def GetPVZ(producer):
    # на вход название продовца
    pvz = PVZ.query.filter_by(producer=producer).all()
    resp = {
        "date": []
    }

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
        resp["date"].append(row)
    
    return resp