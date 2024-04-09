# зависемости

from flask import Flask, request, redirect, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager # pip install Flask_JWT_Extended
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from flask_cors import CORS # pip install -U flask-cors
import json
import sys
import os
import copy
import math
from random import randint

api = Flask(__name__)
CORS(api, supports_credentials=True)

api.config["JWT_SECRET_KEY"] = "super-secret"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=999999)
jwt = JWTManager(api)

api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///code-rock.db'
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)