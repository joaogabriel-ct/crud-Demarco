from app import db
from app.models.empregado import Empregado
from app.utils.cpf_validator import verificaCpf
from datetime import datetime


def criar_empregado(cpf, nome, data_admissao, cargo):
    if not verificaCpf(cpf):
        return {'error': 'CPF invalido, por gentileza verificar'}
    if isinstance(data_admissao, str):
        data_admissao = datetime.strptime(data_admissao, '%Y-%m-%d')
    novo_empregado = Empregado(cpf=cpf, nome=nome, 
                               data_admissao=data_admissao,
                               cargo=cargo)
    db.session.add(novo_empregado)
    db.session.commit()
    empregado_json = {
        'cpf': novo_empregado.cpf,
        'nome': novo_empregado.nome,
        'data_admissao': novo_empregado.data_admissao.strftime('%Y-%m-%d'),
        'cargo': novo_empregado.cargo
    }

    return empregado_json


def listar_empregados():
    return Empregado.query.all()
