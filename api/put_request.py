# запросы на добовление

from core import *
from models import *

@api.route('/addStuff', methods=['PUT'])
@jwt_required()
def AddStuf():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return 'вы пользователь, вы не можете продавать', 401

    try:
        name = request.json["name"]
        foto = request.json["foto"]
        price = request.json["price"]
        size = request.json["size"]
        mass = request.json["mass"]
        description = request.json["description"]
        producer = request.json["producer"]
    except:
        return 'нехватает данных', 401

    item = Stuff(name=name, foto=foto, price=price, size=size, mass=mass, description=description, producer=producer)
    db.session.add(item)
    db.session.commit()

    return 'создал'

@api.route('/addStorehouse', methods=["PUT"])
@jwt_required()
def AddStorehouse():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return 'вы пользователь, вы не можете продавать', 401

    try:
        city = request.json["city"]
    except:
        return 'нехватает данных', 401

    userID = Producer.query.filter_by(name=user).first().id
    storehouse = Storehouse.query.filter_by(producer=userID).all()
    for el in storehouse:
        if el.city==city:
            return 'в этом городе уже есть ваш склад', 401
    
    storehouse = Storehouse(city=city, producer=userID)
    db.session.add(storehouse)
    db.session.commit()

    return 'создал'

@api.route('/addPVZ', methods=["PUT"])
@jwt_required()
def AddPVZ():
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return 'вы пользователь, вы не можете продавать', 401
    
    try:
        address = request.json["address"]
        city = request.json["city"]
        time_from = request.json["time_from"]
        price_from = request.json["price_from"]
        distance_from = request.json["distance_from"]
    except:
        return 'нехватает данных', 401

    pvz = PVZ.query.filter_by(address=address).all()
    if pvz:
        return 'по этому адрессу уже есть ПВЗ', 401

    userID = Producer.query.filter_by(name=user).first().id
    pvz = PVZ(producer=userID, city=city, address=address, time_from=time_from, price_from=price_from, distance_from=distance_from)
    db.session.add(pvz)
    db.session.commit()

    return 'создал'
