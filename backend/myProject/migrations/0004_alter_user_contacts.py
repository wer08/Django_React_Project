# Generated by Django 4.1.1 on 2023-02-28 10:56

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0003_alter_user_contacts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='contacts',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=255), default=list, null=True, size=None),
        ),
    ]
