#  модели таблиц базы данных

from core import *

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    password = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id
    
class Producer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    password = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id
    
class Stuff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    photo = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String(256), nullable=False)
    mass = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    producer = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id
    
class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, nullable=False)
    stuff = db.Column(db.Integer, nullable=False)
    storehouse = db.Column(db.Integer)
    pvz = db.Column(db.Integer)
    initial_city = db.Column(db.String(256))
    final_city = db.Column(db.String(256))
    way = db.Column(db.Text)
    status = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id
    
class Storehouse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(256), nullable=False)
    producer = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id

class PVZ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producer = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    time_from = db.Column(db.Integer, nullable=False)
    price_from = db.Column(db.Integer, nullable=False)
    distance_from = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id
    
class Map(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    initial_city = db.Column(db.String(256), nullable=False)
    final_city = db.Column(db.String(256), nullable=False)
    time_way = db.Column(db.Integer, nullable=False)
    price_way = db.Column(db.Integer, nullable=False)
    distance_way = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id

def GetRole(name):
    user = User.query.filter_by(name=name).first()
    if not user:
        user = Producer.query.filter_by(name=name).first()
        role = 'producer'
    else:
        role = 'user'
    return role