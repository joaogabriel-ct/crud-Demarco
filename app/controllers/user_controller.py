from app import db
from app.models.user import User


def criar_usuario(username, password):
    novo_usuario = User(username=username, password=password)
    db.session.add(novo_usuario)
    db.session.commit()
    return {'message': 'Usuário criado com sucesso!'}


def listar_usuarios():
    return User.query.all()
