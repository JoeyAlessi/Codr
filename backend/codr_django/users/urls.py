from django.urls import path
from . import views

urlpatterns = [
    path(
        "api/register",
        views.UserRegisterView.as_view(),
    ),
    path("api/login", views.UserLoginView.as_view()),  # new login path

]
