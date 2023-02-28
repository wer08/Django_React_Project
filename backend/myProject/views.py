from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Student, User, Message
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


def add_contact(request,pk_user):
    user = User.objects.get(pk = pk_user)
    if request.method == 'PUT':
        body = json.loads(request.body)
        contact_email = body['email']
        if not contact_email in user.contacts:
            user.contacts.append(contact_email)
            user.save()
            return HttpResponse(status=204)

def get_convo(request):
    if request.method == 'GET':
        body = json.loads(request.body)
        user_pk = body[user_pk]
        contact_mail = body[contact_mail]
        contact_pk = User.objects.get(email=contact_mail).pk
        messages_sent = Message.objects.filter(sender = user_pk, receiver = contact_pk)
        messages_sent = [message.serialize() for message in messages_sent]
        messages_received = Message.objects.filter(sender = contact_pk, receiver = user_pk)
        messages_received = [message.serialize() for message in messages_received]
        response = {
            'sent': messages_sent,
            'received': messages_received
        }
        return JsonResponse(response)

