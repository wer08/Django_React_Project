
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone)
        user.set_password(password)
        user.save()

        return user
    def create_superuser(self, email, name, phone, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone)
        user.set_password(password)
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=12)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default = False)
    contacts = ArrayField(models.IntegerField(blank=True),null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','phone']

    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name
    def __str__(self):
        return self.email


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




    
