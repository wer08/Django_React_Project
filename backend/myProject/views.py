from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Student, User
import json
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
def change_data(request,pk):
    user = User.objects.get(pk = pk)
    if request.method == 'PUT':
        body = json.loads(request.body)
        first_name = body['first_name']
        last_name = body['last_name']
        phone = body['phone']
        user.first_name = first_name
        user.last_name = last_name
        user.phone = phone
        user.save()
        return HttpResponse(status = 204)
def get_users(request):
    users = User.objects.all()
    users = [user.serialize() for user in users]
    return JsonResponse(users,safe=False)
