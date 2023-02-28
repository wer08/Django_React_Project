from django.urls import path

from . import views

urlpatterns = [
    path('change_data/<int:pk>',views.change_data, name='change_data'),
    path('users',views.get_users,name='get_users'),
    path('add_contact/<int:pk_user>', views.add_contact, name='add_contact'),
    path('get_convo', views.get_convo, name='get_convo')
]
