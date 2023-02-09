
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    contacts = ArrayField(models.IntegerField(blank=True),null=True)

    def __str__(self) -> str:
        return self.username

class Student(models.Model):
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=120)

class Conversation(models.Model):
    participants = ArrayField(models.IntegerField(blank=True),null=True)
    date_of_creation = models.DateTimeField(auto_created=True)

class Message(models.Model):
    date_of_creation = models.DateTimeField(auto_created=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=3500)




    
