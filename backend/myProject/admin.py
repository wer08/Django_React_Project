from django.contrib import admin
from myProject.models import Student,User,Message,Conversation

# Register your models here.
admin.site.register(Student)
admin.site.register(User)
admin.site.register(Message)
admin.site.register(Conversation)
