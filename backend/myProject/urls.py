from django.urls import path

from . import views

urlpatterns = [
    path('change_data/<int:pk>',views.change_data, name='change_data'),
    path('users',views.get_users,name='get_users'),
    path('add_contact/<int:pk_user>', views.add_contact, name='add_contact'),
    path('get_convo', views.get_convo, name='get_convo'),
    path('get_files', views.get_files, name='get_files'),
    path('add_message', views.add_message, name='add_message'),
    path('get_contacts', views.get_contacts, name='get_contacts'),
    path('delete_message/<int:id>', views.delete_message, name='delete_message'),
    path('get_statuses', views.get_statuses, name="get_statuses")

]
