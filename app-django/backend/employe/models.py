from django.db import models


class Empregados(models.Model):
    cpf = models.CharField(max_length=15, blank=True, null=True)
    nome = models.CharField(max_length=200, blank=True, null=True)
    data_admissao = models.DateField()
    cargo = models.CharField(max_length=150)

    def __str__(self):
        return f"nome: {self.nome}"
