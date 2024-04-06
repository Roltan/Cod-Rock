#  модели таблиц базы данных

from core import *

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    password = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<profiles %r>' % self.id