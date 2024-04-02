from django.contrib.auth.models import User


def create_user_with_email(email, password):
    if User.objects.filter(username=email).exists():
        raise ValueError("Um usuário com esse e-mail já existe.")

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
    )

    return user
