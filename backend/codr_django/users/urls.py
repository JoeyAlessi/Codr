from django.urls import path
from . import views

urlpatterns = [
    # path('register/', views.UserRegisterView.as_view(), name = 'register')
    path('hello/', views.HelloWorld.as_view(), name = 'hello')
]