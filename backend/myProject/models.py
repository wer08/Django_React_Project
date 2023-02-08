
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=120)



    
