# Generated by Django 4.1.1 on 2023-03-01 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0007_alter_message_date_of_creation'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(default='profile.png', upload_to=''),
        ),
    ]
