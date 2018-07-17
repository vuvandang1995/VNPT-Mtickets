from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('', views.tk_create, name='tk_create'),
]