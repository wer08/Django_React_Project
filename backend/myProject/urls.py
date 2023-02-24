from django.urls import path

from . import views

urlpatterns = [
    path('change_data/<int:pk>',views.change_data, name='change_data'),
    path('users',views.get_users,name='get_users')
]
