
from datetime import datetime
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import PostSerializer, UserSerializer
from .models import Post, TopicsOfInterest
from django.contrib.auth.models import User
import jwt
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from fuzzywuzzy import process

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

        user = User.objects.create_user(
            username=user_name, email=user_email, password=user_password
        )  # Automatically creates user ID

        # Create JWT token for new user using User Table
        serialized_user = UserSerializer(user).data

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

        user = User.objects.filter(username=username).first()
        print("USER", user)

        if user is None:
            return Response(
                data="Username not found.", status=status.HTTP_411_LENGTH_REQUIRED
            )

        if check_password(password, user.password):
            print("USER:", user)
            print("PASSWORD:", password)

        serialized_user = UserSerializer(user).data

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
    def post(self, request, *args, **kwargs):
        jwt_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        print("COOKIE", request.COOKIES)

        # if Cookies exist, decode cookie and return user info
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

        # else user has no token and return nothing
        else:
            return Response(
                {"Error": "No token found."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class UserInterestView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        user = User.objects.get(username=user_name)
        print("USER", user)



        print("USERNAME", user_name)
        # print("ID", user_id)

        user_interests = request.data.get("interests")

        user_interests = TopicsOfInterest.objects.create(
            user=user, topics=user_interests
        )

        return Response({"Message", "Interests updated"})

class PostView(APIView):
    def post(self, request, *args, **kwargs):
        print("request.data:", request.data)
        
        username = request.data.get("username")
        post_content = request.data.get("content")

        user = User.objects.get(username=username)
        print("USER",user.__dict__)
        
        if user is None:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

        new_post = Post.objects.create(
            user=user, content=post_content
        )   

        serialized_post = PostSerializer(new_post)
        return Response(serialized_post.data, status=status.HTTP_201_CREATED)
    

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        print("LOGGING OUT")

        past_time = datetime(1970, 1, 1)

        username = request.data.get("username")

        user = User.objects.filter(username=username).first()
        serialized_user = UserSerializer(user).data
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
        # making sure to not fetch own user's name
        # Retrieve all usernames from the database
        all_usernames = User.objects.exclude(username=username).values_list('username', flat=True)

            # Find matches using fuzzy matching, limit to the top 10 matches
        matches = process.extract(query, all_usernames, limit=15)

        # removing score
        usernames = [match[0] for match in matches]


        print("USERS", usernames)

        return Response(usernames, status=status.HTTP_200_OK)  # Return the top 10 matches as a JSON response

class FetchUserProfile(APIView):
    def get(self, request, *args, **kwargs):

        # take username from url
        username = kwargs.get("username")
        user = User.objects.get(username=username)

        # add future logic to get user.followers + user.following numbers

        data = {
                'username': user.username,
            }
        return Response(data, status=status.HTTP_200_OK)


        


# class FetchPostsView(APIView):
#     def get(self, request, *args, **kwargs):






        
