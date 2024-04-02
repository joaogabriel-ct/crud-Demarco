from rest_framework import serializers
from .models import Empregados


class EmpregadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empregados
        fields = ['id', 'cpf', 'nome', 'data_admissao', 'cargo']