# Generated by Django 5.0.3 on 2024-04-02 03:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("employe", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="empregados",
            name="data_admissao",
            field=models.DateField(),
        ),
    ]