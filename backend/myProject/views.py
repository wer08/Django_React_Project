from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .models import Student, User, Message
import json
from django.views.decorators.csrf import csrf_exempt
from operator import itemgetter




# Create your views here.
def change_data(request,pk):
    user = User.objects.get(pk = pk)
    if request.method == 'POST':
        data = request.POST
        picture = request.FILES
        body = json.loads(data.get("body"))
        first_name = body['first_name']
        last_name = body['last_name']
        phone = body['phone']
        user.first_name = first_name
        user.last_name = last_name
        user.phone = phone
        if picture.get("picture"):
            user.profile_pic = picture.get("picture")
        user.save()
        return JsonResponse(user.serialize())
    

def get_users(request):
    users = User.objects.all()
    users = [user.serialize() for user in users]
    return JsonResponse(users,safe=False)


def add_contact(request,pk_user):
    user = User.objects.get(pk = pk_user)
    if request.method == 'PUT':
        body = json.loads(request.body)
        contact_email = body['email']
        contact = User.objects.get(email = contact_email)
        if not contact_email in user.contacts:
            user.contacts.append(contact_email)
            contact.contacts.append(user.email)
            user.save()
            contact.save()
            return HttpResponse(status=204)
        
def get_contacts(request):
    id=request.GET.get('id',"")
    user = User.objects.get(pk = id)
    contacts = [User.objects.get(email = contact).serialize() for contact in user.contacts]
    return JsonResponse(contacts, safe=False)

def get_statuses(request):
    id = request.GET.get('id',"")
    user = User.objects.get(pk=id)
    statuses = {}
    for message in user.received_messages.all():
        if not message.is_read:
            statuses[message.sender.pk] = False
        else:
            statuses[message.sender.pk] = True
    return JsonResponse(statuses)




def get_convo(request):
    user_pk = request.GET.get('user_id',"")
    contact_pk = request.GET.get('contact_id',"")
    page = request.GET.get('page',"")
    number = int(page) * 20
    messages_sent = Message.objects.filter(sender = user_pk, receiver = contact_pk)
    messages_sent = [message.serialize() for message in messages_sent]
    messages_received = Message.objects.filter(sender = contact_pk, receiver = user_pk)
    for message in messages_received:
        message.is_read = True
        message.save()
    messages_received = [message.serialize() for message in messages_received]
    if int(user_pk) != int(contact_pk):
        messages = messages_sent + messages_received
    else:
        messages = messages_received
    number_of_pages = (len(messages) // 20) + 1
    messages_sorted = sorted(messages, key=itemgetter('date_of_creation'))[-number:]
    resp = {
        'messages': messages_sorted,
        'receiver': contact_pk,
        'number_of_pages': number_of_pages
    }
    return JsonResponse(resp)


def add_message(request):
    if request.method == 'POST':
        data = request.POST
        files = request.FILES
        body = json.loads(data.get("body"))
        id = body['contact_id']
        contact = User.objects.get(pk=id)
        user = User.objects.get(pk = body['pk'])
        text = body['text']
        if files.get("file"):
            message = Message(sender=user, receiver = contact, body = "", file = files.get("file"))
        else:
            message = Message(sender=user,receiver=contact,body=text)
        message.save()
        print('message:',message.file)
        return HttpResponse(status=204)

def delete_message(request,id):
    if request.method == 'DELETE':
        message = Message.objects.get(pk=id)
        if message.file:
            message.file.delete()
        message.delete()
        return HttpResponse(status=204)



