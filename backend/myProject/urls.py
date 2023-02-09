from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>', views.change, name='change'),
    path('getUser',views.getUser, name="getUser")
]
