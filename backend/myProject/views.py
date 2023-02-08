from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import serializers
from .models import Student
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    student = Student.objects.get(pk=1)
    data = {
        'name': student.name,
        'surname': student.surname
    }
    return JsonResponse(data, safe=False)

@csrf_exempt
def change(request,id):

    student = Student.objects.get(pk=id)
    if request.method == 'PUT':
        data = json.loads(request.body)
        name = data['name']
        surname = data['surname']
        student.name = name
        student.surname = surname
        student.save()
        return HttpResponse(status = 204)

