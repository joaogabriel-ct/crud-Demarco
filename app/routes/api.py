from flask import jsonify, request, Blueprint
from app.controllers.empregado_controller import criar_empregado, listar_empregados
from app.controllers.user_controller import criar_usuario
from app.models.user import User
from app import auth


api_bp = Blueprint('api', __name__)

# Função para verificar usuário e senha
@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return True
    return False


@api_bp.route('/api/users', methods=['POST'])
def criar_usuario_endpoint():
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Dados incompletos'}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Nome de usuário já existe'}), 400

    novo_usuario = criar_usuario(data['username'], data['password'])
    return jsonify(novo_usuario), 201


# Endpoint para gravar dados de empregados
@api_bp.route('/api/empregados', methods=['POST'])
@auth.login_required
def criar_empregado_endpoint():
    data = request.json
    novo_empregado = criar_empregado(
        data['cpf'],
        data['nome'],
        data['data_admissao'],
        data['cargo']
        )
    return jsonify(novo_empregado), 201


# Endpoint para listar empregados
@api_bp.route('/api/empregados', methods=['GET'])
def listar_empregados_endpoint():
    empregados = listar_empregados()
    empregados_json = [{
        'cpf': empregado.cpf,
        'nome': empregado.nome,
        'data_admissao': empregado.data_admissao.strftime('%Y-%m-%d'),
        'cargo': empregado.cargo
        } for empregado in empregados]
    return jsonify(empregados_json)
