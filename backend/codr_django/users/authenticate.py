# from rest_framework_simplejwt.authentication import JWTAuthentication
# from django.conf import settings

# from rest_framework.authentication import CSRFCheck
# from rest_framework import exceptions


# MAYBE WILL USE LATER FOR AUTHENTICATION

# def enforce_csrf(request):
#     check = CSRFCheck()
#     check.process_request(request)
#     reason = check.process_view(request, None, (), {})
#     print("REASON", reason)
#     if reason:
#         print("HI ROBBY")
#         raise exceptions.PermissionDenied("CSRF Failed: %s" % reason)


# class CustomAuthentication(JWTAuthentication):
#     def authenticate(self, request):
#         print("AUTHENTICATE")
#         header = self.get_header(request)
#         print("HEADER", header)

#         if header is None:
#             raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"]) or None
#         else:
#             raw_token = self.get_raw_token(header)
#         if raw_token is None:
#             return None

#         validated_token = self.get_validated_token(raw_token)
#         print("VALIDATED_TOKEN", validated_token)
#         enforce_csrf(request)
#         return self.get_user(validated_token), validated_token
