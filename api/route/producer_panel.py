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

    query = 0
    # на вход можно и id и имя
    try:
        int(stuff)
        query = Stuff.query.filter_by(id=stuff).first()
    except:
        query = Stuff.query.filter_by(name=stuff).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого тавара"
        }, 404

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        name = request.form["name"]
        query.name = name
        patch.append('имя')
    except:
        pass
    try:
        price = request.form["price"]
        query.price = price
        patch.append('цену')
    except:
        pass
    try:
        size = request.form["size"]
        query.size = size
        patch.append('размер')
    except:
        pass
    try:
        mass = request.form["mass"]
        query.mass = mass
        patch.append('массу')
    except:
        pass
    try:
        description = request.form["description"]
        query.description = description
        patch.append('описание')
    except:
        pass
    try:
        photoName = request.form["photoName"]
        photoFile = request.files['photo']

        # удалил старую
        lastName = query.photo
        path = '../front/public' + lastName
        print(path)
        os.remove(path)

        # добавил новую
        path = '../front/public/img/stuff/' + photoFile.filename
        # print(photoFile)
        photoFile.save(path)
        os.rename(path, '../front/public/img/stuff/'+photoName)
        query.photo = '/img/stuff/'+photoName

        patch.append('фото')
    except:
        pass

    if patch:
        db.session.commit()
        resp = 'изменил '
        for i in range(len(patch)-1):
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
    
    query = 0
    # на вход можно и id и имя
    try:
        int(stuff)
        query = Stuff.query.filter_by(id=stuff).first()
    except:
        query = Stuff.query.filter_by(name=stuff).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого товара"
        }, 404

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    try:
        db.session.delete(Orders.query.filter_by(stuff=query.id).first())
    except:
        pass
    db.session.delete(query)
    db.session.commit()

    return 'убрал'


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
    try:
        int(pvz)
        query = PVZ.query.filter_by(id=pvz).first()
    except:
        query = PVZ.query.filter_by(name=pvz).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого пвз"
        }, 404
    
    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        city = request.form["city"]
        query.city = city
        patch.append('город')
    except:
        pass
    try:
        address = request.form["address"]
        query.address = address
        patch.append('адресс')
    except:
        pass
    try:
        time_from = request.form["time_from"]
        query.time_from = time_from
        patch.append('время до')
    except:
        pass
    try:
        price_from = request.form["price_from"]
        query.price_from = price_from
        patch.append('цена до')
    except:
        pass
    try:
        distance_from = request.form["distance_from"]
        query.distance_from = distance_from
        patch.append('растояние до')
    except:
        pass


    if patch:
        db.session.commit()
        resp = 'изменил '
        for i in range(len(patch)-1):
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
    
    # pvz = 0
    # на вход можно и id и имя
    try:
        int(pvz)
        print(pvz)
        query = PVZ.query.filter_by(id=pvz).first()
    except:
        query = PVZ.query.filter_by(name=pvz).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого пвз"
        }, 404

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    try:
        db.session.delete(Orders.query.filter_by(pvz=query.id).first())
    except:
        pass
    db.session.delete(query)
    db.session.commit()

    return "убрал"


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

    query = 0
    # на вход можно и id и имя
    try:
        int(storehouse)
        query = Storehouse.query.filter_by(id=storehouse).first()
    except:
        query = Storehouse.query.filter_by(name=storehouse).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого склада"
        }, 404
    
    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    patch = []

    # принимаю данные
    try:
        city = request.form["city"]
        query.city = city
        patch.append('город')
    except:
        pass
    


    if patch:
        db.session.commit()
        resp = 'изменил '
        for i in range(len(patch)-1):
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
    
    # на вход можно и id и имя
    try:
        int(storehouse)
        query = Storehouse.query.filter_by(id=storehouse).first()
    except:
        query = Storehouse.query.filter_by(name=storehouse).first()
    if not query:
        return {
            'err': 5,
            "errString": "нет такого склада"
        }, 404

    if query.producer != GetID(user):
        return {
            "errCode": 6,
            "errString": "это не ваш товар"
        }, 403

    try:
        db.session.delete(Orders.query.filter_by(storehouse=query.id).first())
    except:
        pass
    db.session.delete(query)
    db.session.commit()

    return 'удалил'