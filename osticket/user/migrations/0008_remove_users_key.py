# Generated by Django 2.0.5 on 2018-07-13 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_auto_20180713_1118'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='key',
        ),
    ]
