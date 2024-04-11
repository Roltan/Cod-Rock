# функции по запросам

from core import *
from instance.models import *

# автаризация
@api.route('/login', methods=['POST'])
def Login():
    try:
        name = request.json.get('name')
        password = request.json.get('password')
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401

    if GetRole(name)=='user':
        user = User.query.filter_by(name=name).first()
        if user is None:
            resp = {
                "errCode": 2,
                "errString": "неверный логин"
            }
            return resp, 401
        if not check_password_hash(user.password, password):
            resp = {
                "errCode": 2,
                "errString": "неверный пароль"
            }
            return resp, 401
    elif GetRole(name)=='producer':
        user = Producer.query.filter_by(name=name).first()
        if user is None:
            resp = {
                "errCode": 2,
                "errString": "неверный логин"
            }
            return resp, 401
        if not check_password_hash(user.password, password):
            resp = {
                "errCode": 2,
                "errString": "неверный пароль"
            }
            return resp, 401

    token = create_access_token(identity=name)
    return {'access_token':token}

# регистрация
@api.route('/register', methods=['PUT'])
def Register():
    try:
        name = request.json.get('name')
        password = request.json.get('password')
        role = request.json.get('role')
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401

    users = User.query.filter_by(name=name).first()
    producer = Producer.query.filter_by(name=name).first()
    if users or producer:
        resp = {
            "errCode": 4,
            "errString": "такой пользователь уже есть"
        }
        return resp, 401
    password = generate_password_hash(password)

    if role == 'user':
        user = User(name=name, password=password)
        db.session.add(user)
    elif role == 'producer':
        producer = Producer(name=name, password=password)
        db.session.add(producer)
    db.session.commit()

    token = create_access_token(identity=name)
    return {'access_token':token}

# выход из акаунта
@api.route('/logout', methods=["POST"])
def Logout():
    resp = jsonify({"msg":"logout successful"})
    unset_jwt_cookies(resp)
    return resp

# тестовый запрос
# вывод одного пользователя
@api.route('/user', methods=["GET"])
@jwt_required()
def My_profile():
    name = get_jwt()["sub"]
    role = GetRole(name)
    if role == 'user':
        user = User.query.filter_by(name=name).first()
    elif role == 'producer':
        user = Producer.query.filter_by(name=name).first()
        
    resp = {
        "id": user.id,
        "name": user.name,
        "role": role
    }
    return resp, 200