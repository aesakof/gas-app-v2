# Generated by Django 4.0.1 on 2022-02-12 23:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gas_app', '0006_alter_car_model_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='model_year',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(2023)]),
        ),
    ]
