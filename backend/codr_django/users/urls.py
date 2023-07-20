from django.urls import path
from . import views
from .views import LoginView, UserInterestView

urlpatterns = [
    path(
        "api/userInfo",
        views.PostView.as_view(),
    ),
    # path(
    #     "api/register",
    #     views.UserRegisterView.as_view(),
    # ),
    path("api/login", views.LoginView.as_view()),
    path("api/register", views.RegisterView.as_view()),
    path("api/interests", UserInterestView.as_view()),
    path(
        "api/post",
        views.PostView.as_view(),
    ),
    # path("api/login", views.LoginView.as_view()),
]
