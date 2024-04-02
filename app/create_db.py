from app import create_app, db
from app.models.empregado import Empregado
from app.models.user import User

app = create_app()


# Função para criar o banco de dados e aplicar as migrações
def create_database():
    with app.app_context():
        db.create_all()
        # Cria um usuário admin se não existir
        admin_user = User.query.filter_by(username='admin').first()
        if not admin_user:
            admin_user = User(username='admin', password='admin123')
            db.session.add(admin_user)
            db.session.commit()


if __name__ == '__main__':
    create_database()
