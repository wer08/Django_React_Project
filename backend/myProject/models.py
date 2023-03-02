
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extrafields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email,**extrafields)
        user.set_password(password)
        user.save()

        return user
    def create_superuser(self, email, phone, password=None, **extrafields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extrafields)
        user.set_password(password)
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=12)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default = False)
    contacts = ArrayField(models.CharField(blank=True, max_length=255),null=True,default=list)
    profile_pic = models.ImageField(upload_to='media', default='media/profile.png')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    def get_full_name(self):
        return self.first_name
    def get_short_name(self):
        return self.first_name

    def serialize(self):
        return{
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'contacts': self.contacts,
            'id': self.pk,
            'profile_pic': f'http://localhost:8000{self.profile_pic.url}'
        }


    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'

class Student(models.Model):
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=120)

class Message(models.Model):
    date_of_creation = models.DateTimeField(auto_now_add=True, blank=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='send_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    body = models.CharField(max_length=3500)

    def serialize(self):
        return {
            'id': self.pk,
            'date_of_creation': self.date_of_creation,
            'body':self.body,
            'sender': self.sender.pk,
            'receiver': self.receiver.pk
        }




    
