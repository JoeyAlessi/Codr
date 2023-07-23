from django.urls import path
from . import views
from .views import UserInterestView

urlpatterns = [
    path(
        "api/userInfo",
        views.PostView.as_view(),
    ),
    path("api/login", views.UserLoginView.as_view()),
    path("api/register", views.UserRegisterView.as_view()),
    path("api/interests", UserInterestView.as_view()),
    path(
        "api/post",
        views.PostView.as_view(),
    ),
]
