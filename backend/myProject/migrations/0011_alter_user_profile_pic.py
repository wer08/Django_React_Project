# Generated by Django 4.1.1 on 2023-03-02 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0010_alter_user_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(default='media/profile.png', upload_to='media'),
        ),
    ]