# панель производителя
import sys
sys.path.append('../')

from core import *
from instance.models import *

# товары
@api.route('/Producer/patch/Stuff/<stuff>', methods=["PATCH"])
@jwt_required()
def PatchStuff(stuff):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403

    # на вход можно и id и имя
    if type(stuff) == str:
        stuff = Stuff.query.filter_by(name=stuff).first()
    elif type(stuff) == int:
        stuff = Stuff.query.filter_by(id=stuff).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401

    if stuff.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        name = request.form["name"]
        stuff.name = name
        patch.append('имя')
    except:
        pass
    try:
        price = request.form["price"]
        stuff.price = price
        patch.append('цену')
    except:
        pass
    try:
        size = request.form["size"]
        stuff.size = size
        patch.append('размер')
    except:
        pass
    try:
        mass = request.form["mass"]
        stuff.mass = mass
        patch.append('массу')
    except:
        pass
    try:
        description = request.form["description"]
        stuff.description = description
        patch.append('описание')
    except:
        pass
    try:
        photoName = request.form["photoName"]
        photoFile = request.files['photo']

        # удалил старую
        lastName = stuff.photo
        path = '../front/img/stuff/' + lastName
        os.remove(path)

        # добавил новую
        path = '../front/img/stuff/' + photoFile.filename
        photoFile.save(path)
        os.rename(path, '../front/img/stuff/'+photoName)
        stuff.photo = '/img/stuff/'+photoName

        patch.append('фото')
    except:
        pass

    if patch:
        resp = 'изменил '
        for i in range(patch-1):
            resp+= patch[i]+', '
        resp+= patch[-1]
        return {
            "responce": resp
        }
    else:
        return {
            "responce": "ничего не изенилось"
        }

@api.route('/Producer/del/Stuff/<stuff>', methods=["DELETE"])
@jwt_required()
def DelStuff(stuff):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    if type(stuff) == str:
        query = Stuff.query.filter_by(name=stuff).first()
    elif type(stuff) == int:
        query = Stuff.query.filter_by(id=stuff).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    db.session.delete(Orders.query.filter_by(stuff=query.id).first())
    db.session.delete(query)
    db.session.commit()


# пвз
@api.route('/Producer/patch/PVZ/<pvz>', methods=["PATCH"])
@jwt_required()
def PatchPVZ(pvz):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403

    # на вход можно и id и адресс
    if type(pvz) == str:
        pvz = Stuff.query.filter_by(name=pvz).first()
    elif type(pvz) == int:
        pvz = Stuff.query.filter_by(id=pvz).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401
    
    if pvz.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        city = request.form["city"]
        pvz.city = city
        patch.append('город')
    except:
        pass
    try:
        address = request.form["address"]
        pvz.address = address
        patch.append('адресс')
    except:
        pass
    try:
        time_from = request.form["time_from"]
        pvz.time_from = time_from
        patch.append('время до')
    except:
        pass
    try:
        price_from = request.form["price_from"]
        pvz.price_from = price_from
        patch.append('цена до')
    except:
        pass
    try:
        distance_from = request.form["distance_from"]
        pvz.distance_from = distance_from
        patch.append('растояние до')
    except:
        pass


    if patch:
        resp = 'изменил '
        for i in range(patch-1):
            resp+= patch[i]+', '
        resp+= patch[-1]
        return {
            "responce": resp
        }
    else:
        return {
            "responce": "ничего не изенилось"
        }

@api.route('/Producer/del/PVZ/<pvz>', methods=["DELETE"])
@jwt_required()
def DelPVZ(pvz):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    if type(pvz) == str:
        query = Stuff.query.filter_by(address=pvz).first()
    elif type(pvz) == int:
        query = Stuff.query.filter_by(id=pvz).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    db.session.delete(Orders.query.filter_by(pvz=query.id).first())
    db.session.delete(query)
    db.session.commit()


# склады
@api.route('/Producer/patch/Storehouse/<storehouse>', methods=["PATCH"])
@jwt_required()
def PatchStorehouse(storehouse):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403

    # на вход можно и id и город
    if type(storehouse) == str:
        storehouse = Stuff.query.filter_by(city=storehouse).first()
    elif type(storehouse) == int:
        storehouse = Stuff.query.filter_by(id=storehouse).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401
    
    if storehouse.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        city = request.form["city"]
        storehouse.city = city
        patch.append('город')
    except:
        pass
    


    if patch:
        resp = 'изменил '
        for i in range(patch-1):
            resp+= patch[i]+', '
        resp+= patch[-1]
        return {
            "responce": resp
        }
    else:
        return {
            "responce": "ничего не изенилось"
        }
    
@api.route('/Producer/del/Storehouse/<storehouse>', methods=["DELETE"])
@jwt_required()
def DelStorehouse(storehouse):
    user = get_jwt()["sub"]
    if GetRole(user) == 'user':
        return {
            "errCode": 2,
            "errString": "вы пользователь, вы не можете продовать"
        }, 403
    
    if type(storehouse) == str:
        query = Stuff.query.filter_by(address=storehouse).first()
    elif type(storehouse) == int:
        query = Stuff.query.filter_by(id=storehouse).first()
    else:
        return {
            "errCode": 1,
            "errString": "нехватает данных"
        }, 401

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    db.session.delete(Orders.query.filter_by(storehouse=query.id).first())
    db.session.delete(query)
    db.session.commit()