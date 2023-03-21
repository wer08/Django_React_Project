from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Message

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name','last_name', 'password','phone','profile_pic')
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['date_of_creation','pk','sender','receiver','body','file','is_read']

    