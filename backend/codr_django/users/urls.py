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
        "api/authenticate",
        views.AuthenticateTokenView.as_view(),
    ),
    path(
        "api/post",
        views.PostView.as_view(),
    ),
    path("api/logout", views.LogoutView.as_view()),
    path("api/search-users", views.SearchUsersView.as_view()),
    path("user/<str:username>/profile", views.FetchUserProfile.as_view())
    # path("api/fetch-posts", views.FetchPostsView.as_view()),
]
