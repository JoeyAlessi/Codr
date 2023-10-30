
from datetime import datetime
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import PostSerializer, UserSerializer, CommentSerializer
from .models import FriendRequest, Post, TopicsOfInterest, FriendShip, Vote, Comment
from django.contrib.auth.models import User
import jwt
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from fuzzywuzzy import process
from rest_framework.request import Request
from django.db.models import Q, F, Case, When

class UserInfo(APIView):
    def get(self, request, *args, **kwargs):
        needed_user = User.objects.filter()


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        user_password = request.data.get("password")
        user_confirm_pass = request.data.get("confirmPass")
        user_email = request.data.get("email")

        print("USERNAME", user_name)
        print("PASSWORD", user_password)
        print("EMAIL", user_email)

        if not all([user_name, user_password, user_confirm_pass, user_email]):
            return Response(
                {"Error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif user_password != user_confirm_pass:
            return Response(
                {"Error": "Passwords don't match."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif len(user_name) < 6:
            return Response(
                {"Error": "Username must be at least 6 characters long"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif len(user_name) > 21:
            return Response(
                {"Error": "Username must be less than 20 characters or less"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif User.objects.filter(username=user_name).exists():
            return Response(
                {"Error": "Username taken."},
                status=status.HTTP_409_CONFLICT,
            )
        elif User.objects.filter(email=user_email).exists():
            return Response(
                {"Error": "Email already in use."},
                status=status.HTTP_409_CONFLICT,
            )

        my_user = User.objects.create_user(
            username=user_name, email=user_email, password=user_password
        )  # Automatically creates my_user ID

        # Create JWT token for new my_user using User Table
        serialized_user = UserSerializer(my_user).data

        token = jwt.encode(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithm="HS256",
            payload=serialized_user,
        )

        print("TOKEN", token)

        # Set the JWT token as a cookie
        response = Response({"Message": "Register Successful", "User": serialized_user})
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"]
        )
        print("COOKIES", response.cookies)

        return response


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        print("USERNAME", username)
        print("PASSWORD", password)

        if not username and not password:
            return Response(
                {"Error": "Both username and password required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not username:
            return Response(
                {"Error": "Username required to login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password:
            return Response(
                {"Error": "Password required to login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        my_user = User.objects.filter(username=username).first()
        print("USER", my_user)

        if my_user is None:
            return Response(
                data="Username not found.", status=status.HTTP_411_LENGTH_REQUIRED
            )

        if check_password(password, my_user.password):
            print("USER:", my_user)
            print("PASSWORD:", password)

        serialized_user = UserSerializer(my_user).data

        token = jwt.encode(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithm="HS256",
            payload=serialized_user,
        )

        print("TOKEN", token)

        # Set the JWT token as a cookie
        response = Response({"Message": "Login Successful", "User": serialized_user})
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"]
        )
        print("COOKIES", response.cookies)

        return response


class AuthenticateTokenView(APIView):
    def get(self, request, *args, **kwargs):
        jwt_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        print("COOKIE", request.COOKIES)

        # if Cookies exist, decode cookie and return my_user info
        if jwt_token:
            token = str(jwt_token)
            print("TOKEN", token)

            try:
                # Attempt to decode the token. If the token is expired, 
                # this will raise a jwt.ExpiredSignatureError.
                decoded_key = jwt.decode(
                    jwt=token,
                    key=settings.SIMPLE_JWT["SIGNING_KEY"],
                    algorithms=["HS256"],  # Ensure this is a list of strings
                )
                print("DECODED_KEY", decoded_key)
                return Response({"Message": "User cookie found.", "User": decoded_key})

            except jwt.ExpiredSignatureError:
                # Handle the expired token
                return Response(
                    {"Error": "Token has expired."}, 
                    status=status.HTTP_401_UNAUTHORIZED  
                )

            except jwt.InvalidTokenError:
                # Handle invalid token
                return Response(
                    {"Error": "Invalid token."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # else my_user has no token and return nothing
        else:
            return Response(
                {"Error": "No token found."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class UserInterestView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        my_user = User.objects.get(username=user_name)
        print("USER", my_user)



        print("USERNAME", user_name)
        # print("ID", user_id)

        user_interests = request.data.get("interests")

        user_interests = TopicsOfInterest.objects.create(
            my_user=my_user, topics=user_interests
        )

        return Response({"Message", "Interests updated"})

class PostView(APIView):
    def post(self, request, *args, **kwargs):
        
        username = request.data.get("username")
        post_content = request.data.get("content")

        print("USERNAME", username)

        my_user = User.objects.get(username=username)
        print("USER",my_user.__dict__)
        
        if my_user is None:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

        new_post = Post.objects.create(
            user=my_user, content=post_content, username=username
        )   

        serialized_post = PostSerializer(new_post)
        return Response(serialized_post.data, status=status.HTTP_201_CREATED)
    

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        print("LOGGING OUT")

        past_time = datetime(1970, 1, 1)

        username = request.data.get("username")

        my_user = User.objects.filter(username=username).first()
        serialized_user = UserSerializer(my_user).data
        response = Response({"Message": "Logout Successful"})

        token = jwt.encode(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithm="HS256",
            payload=serialized_user,
        )

        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=past_time,
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"]
        )

        print("COOKIES", response.cookies)

        return response

class SearchUsersView(APIView):
    def post(self, request, *args, **kwargs):

        query = request.data.get("query")  # get the search query
        username = request.data.get("username")
        print("INPUTVALUE:", query)

        # Filter usernames by the input value 
        # making sure to not fetch own my_user's name
        # Retrieve all usernames from the database
        all_usernames = User.objects.exclude(username=username).values_list('username', flat=True)

            # Find matches using fuzzy matching, limit to the top 10 matches
        matches = process.extract(query, all_usernames, limit=15)

        # removing score
        usernames = [match[0] for match in matches]


        print("USERS", usernames)

        return Response(usernames, status=status.HTTP_200_OK)  # Return the top 10 matches as a JSON response

class FetchUserProfileView(APIView):
    def get(self, request, *args, **kwargs):
        print("========================")
       
        clientFollowerCount = 0
        myFollowerCount = 0
        clientPostCount = 0
        myPostCount = 0
        clientPosts = []
        myPosts = []

        # take usernames from url
        client_username = kwargs.get("client_username")
        my_username = kwargs.get("my_username")

        # find User 
        client_user = User.objects.get(username=client_username)
        my_user = User.objects.get(username=my_username)

        print(client_user.id)
        print(my_user.id)

        if client_user.id == my_user.id:
            myAccount = True

            myFollowerCount = FriendShip.objects.filter(
                Q(user_one=my_user) | 
                Q(user_two=my_user)).count()
            
            myPostCount = Post.objects.filter(user=my_user).count()
            myPosts = PostSerializer(Post.objects.filter(user=my_user).order_by('-date'), many=True).data
            print("POSTS", myPosts)
        else:
            myAccount = False

            clientFollowerCount = FriendShip.objects.filter(
                Q(user_one=client_user) | 
                Q(user_two=client_user)).count()
            clientPostCount = Post.objects.filter(user=client_user).count()
            clientPosts = PostSerializer(Post.objects.filter(user=client_user).order_by('-date'), many=True).data
            
        # check if either existance is in database
        isFriend = FriendShip.objects.filter(
        Q(user_one=my_user, user_two=client_user) |
        Q(user_one=client_user, user_two=my_user)
        ).exists()

        client_sent_request = FriendRequest.objects.filter(from_user=client_user,to_user=my_user).exists()
        i_sent_request = FriendRequest.objects.filter(from_user=my_user, to_user=client_user).exists()

        serializer = UserSerializer(client_user)
        
        data = {
            "user": serializer.data,            
            "i_sent_request": i_sent_request,
            "client_sent_request": client_sent_request,
            "myAccount": myAccount,
            "isFriend": isFriend,
            "myFollowerCount": myFollowerCount,
            "clientFollowerCount": clientFollowerCount,
            "myPostCount": myPostCount,
            "clientPostCount": clientPostCount,
            "myPosts": myPosts,
            "clientPosts": clientPosts
        }
        print("==========================")        
        return Response(data, status=status.HTTP_200_OK)
    
class FriendRequestView(APIView):
    def post(self, request, *args, **kwargs):

        from_id = request.data.get("from_id")
        to_id = request.data.get("to_id")

        from_id_user = User.objects.get(id=from_id)
        to_id_user = User.objects.get(id=to_id)


        FriendRequest.objects.create(
            from_user=from_id_user, to_user=to_id_user
        )
        return Response({"Message": "Request Sent"}, status=status.HTTP_200_OK)
    

    def delete(self, request: Request, *args, **kwargs):

        to_id = request.query_params.get("my_ID")
        from_id = request.query_params.get("client_ID")

        print("FROMID", from_id)
        print("TOID", to_id)

        from_id_user = User.objects.get(id=from_id)
        to_id_user = User.objects.get(id=to_id)

        instance = FriendRequest.objects.get(from_user=from_id_user, to_user=to_id_user)
        instance.delete()

        return Response({"Message": "Request Removed"}, status=status.HTTP_200_OK)

class CreateFriendshipView(APIView):
    def post(self, request, *args, **kwargs):

        user_one = request.data.get("user_one")
        user_two = request.data.get("user_two")

        user_one_id = User.objects.get(id=user_one)
        user_two_id = User.objects.get(id=user_two)

        # checking if friendrequest exists between two users
        client_sent_request = FriendRequest.objects.filter(from_user=user_two_id,to_user=user_one_id)
        i_sent_request = FriendRequest.objects.filter(from_user=user_one_id, to_user=user_two_id)

        #  remove friend requests from database when friendship is created
        client_sent_request.delete()
        i_sent_request.delete()

        FriendShip.objects.create(
            user_one=user_one_id, user_two=user_two_id
        )

        return Response({"Message": "Friend Added"}, status=status.HTTP_200_OK)

    
class FetchUserNotificationsView(APIView):
    def get(self, request, *args, **kwargs):

        my_username = kwargs.get("my_username")
        my_user = User.objects.get(username=my_username)
        my_user_id = my_user.id
        from_user_ids = FriendRequest.objects.filter(to_user=my_user_id).values_list('from_user_id', flat=True)
        users_sent_requests = User.objects.filter(id__in=from_user_ids)
             
        serializer = UserSerializer(users_sent_requests, many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)


class FetchPostView(APIView):
    def get(self, request, *args, **kwargs):
        print("========================")
        
        my_ID = kwargs.get("my_ID")
        my_user = User.objects.get(id=my_ID)

        my_friends = FriendShip.objects.filter(Q(user_one=my_user) | Q(user_two=my_user)).annotate(
            friend_id=Case(
                When(user_one=my_user, then='user_two'),
                When(user_two=my_user, then='user_one'),
            )
        ).values_list('friend_id', flat=True)

        users_to_fetch_posts = list(my_friends) + [my_ID]


        # fetch posts and JSONify
        # ordering posts in decending order of date/time created
        # fetching 10 most recent
        posts = Post.objects.filter(user__in=users_to_fetch_posts).order_by('-date')[:10]
        serializer = PostSerializer(posts, many=True)
       
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchFriendsView(APIView):
    def post(self, request, *args, **kwargs):

        query = request.data.get("query")  # get the search query
        my_username = request.data.get("username") 
        my_user = User.objects.get(username=my_username)

        friends = FriendShip.objects.filter(
            Q(user_one=my_user) | Q(user_two=my_user)
        ).annotate(
            friend_username=Case(
                When(user_one=my_user, then=F('user_two__username')),
                When(user_two=my_user, then=F('user_one__username')),
            )
        ).values_list('friend_username', flat=True)

        matches = process.extract(query, friends, limit=6)
        
        # Extract only usernames from the matches
        matched_usernames = [match[0] for match in matches]

        print("FRIENDS", matched_usernames)
   
        return Response(matched_usernames, status=status.HTTP_200_OK)

class VoteView(APIView):
    def post(self, request, *args, **kwargs):

        my_ID = request.data.get("user_ID")
        post_ID = request.data.get("post_ID")

        print("MYID", my_ID)
        print("POSTID", post_ID)

        my_user = User.objects.get(id=my_ID)
        post = Post.objects.get(post_id=post_ID)

        # determine if the user has liked the post already
        user_liked_photo = Vote.objects.filter(user=my_user, post=post).exists()

        # if user already liked photo, pressing again will remove their like
        # else the user hasn't pressed like button and will like the post
        if user_liked_photo:
            print("USER LIKED POST PREVIOUSLY")
            post.likes -= 1
            post.save()
            Vote.objects.get(user=my_user, post=post).delete()
        else:
            print("USER HASN'T LIKED POST PREVIOUSLY")
            post.likes += 1
            post.save()
            Vote.objects.create(user=my_user, post=post)

        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FetchPostCommentsView(APIView):
    def get(self, request: Request, *args, **kwargs):
        print("FETCHING COMMENTS ===================================")

        post_ID = request.query_params.get("post_ID")
        required_post = Post.objects.get(post_id=post_ID)

        comments = Comment.objects.filter(post=required_post)

        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request: Request, *args, **kwargs):

        post_id = request.data.get("post_id")
        user_id = request.data.get("user_id")
        comment = request.data.get("comment")
        username = request.data.get("username")

        # if comment is empty dont post
        if not comment:
            return Response({"Message": "Comment is Empty."}, status=status.HTTP_204_NO_CONTENT)

        

        post = Post.objects.get(post_id=post_id)
        user = User.objects.get(id=user_id)
        
        Comment.objects.create(post=post, user=user, content=comment, username=username)

        return Response({"Message": "Comment Created"}, status=status.HTTP_200_OK)





       
    


       
