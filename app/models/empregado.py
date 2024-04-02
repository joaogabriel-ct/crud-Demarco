from app import db
from datetime import datetime

class Empregado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cpf = db.Column(db.String(15), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    data_admissao = db.Column(db.DateTime, nullable=False)
    cargo = db.Column(db.String(100))