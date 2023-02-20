from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Student, User
import json
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
def findUser(request,email):
    user = User.objects.get(email = email)
    return JsonResponse(user)
