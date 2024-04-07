# функции по запросам

from core import *
from models import *

# автаризация
@api.route('/login', methods=['POST'])
def Login():
    name = request.json.get('name')
    password = request.json.get('password')

    if GetRole(name)=='user':
        user = User.query.filter_by(name=name).first()
        if user is None:
            return "неверный логин", 401
        if not check_password_hash(user.password, password):
            return "неверный пароль", 401
    elif GetRole(name)=='producer':
        user = Producer.query.filter_by(name=name).first()
        if user is None:
            return "неверный логин", 401
        if not check_password_hash(user.password, password):
            return "неверный пароль", 401

    token = create_access_token(identity=name)
    return {'access_token':token}

# регистрация
@api.route('/register', methods=['PUT'])
def Register():
    name = request.json.get('name')
    password = request.json.get('password')
    role = request.json.get('role')

    users = User.query.filter_by(name=name).first()
    producer = Producer.query.filter_by(name=name).first()
    if users or producer:
        return 'такой пользователь уже зарегестрирован', 401
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

# обновление токенов если у них истикает время
@api.after_request
def Refresh_expiring_jwts(resp):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now()
        target_tamestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_tamestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            date = resp.get.json()
            if type(date) is dict:
                date["access_token"]=access_token
                resp.date = json.damps(date)
        return resp

    except (RuntimeError, KeyError):
        return resp

# тестовый запрос
# вывод одного пользователя
@api.route('/user')
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