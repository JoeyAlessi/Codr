from django.urls import path
from . import views
from .views import UserInterestView

urlpatterns = [
    path("api/userInfo",views.PostView.as_view()),
    path("api/login", views.UserLoginView.as_view()),
    path("api/register", views.UserRegisterView.as_view()),
    path("api/interests", UserInterestView.as_view()),
    path("api/authenticate",views.AuthenticateTokenView.as_view()),
    path("api/post",views.PostView.as_view(),),
    path("api/logout", views.LogoutView.as_view()),
    path("api/search_users", views.SearchUsersView.as_view()),
    path("user/<str:client_username>/<str:my_username>", views.FetchUserProfileView.as_view()),
    path("user/handle_request", views.FriendRequestView.as_view()),
    path("api/<str:my_username>/notifications", views.FetchUserNotificationsView.as_view()),
    path("api/create_friendship", views.CreateFriendshipView.as_view()),
    path("api/<int:my_ID>/fetch_posts", views.FetchPostView.as_view()),
    path("user/search_friends", views.SearchFriendsView.as_view()),
    path("api/photo/determine_like", views.VoteView.as_view()),
    path("api/handle_comments", views.FetchPostCommentsView.as_view()),
]
