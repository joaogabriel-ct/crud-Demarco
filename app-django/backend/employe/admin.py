from django.contrib import admin
from .models import Empregados


@admin.register(Empregados)
class EmpregadosAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'cpf',
        'nome',
        'data_admissao',
        'cargo'
    )
