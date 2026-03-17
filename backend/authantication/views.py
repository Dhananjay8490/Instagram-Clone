from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from authantication.serializers import userRegistratioSerializer, UserLoginSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

@api_view(['POST'])
def register(request):
    serializer = userRegistratioSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'user registered successfully',
            'user' : UserSerializer(user).data,
            'tokens': {
                'refresh' : str(refresh),
                'access' : str(refresh.access_token),
            }
        }, status=201)

    errs = serializer.errors

    return Response({'errors': errs}, status=400)

@api_view(['GET'])
def profile(request):
    print(request.user)
    return Response({'message': 'user profile', 'user': UserSerializer(request.user).data})

@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'detail': 'email and password are mandatory'}, status=400)
    user = authenticate(username=username, password =password)
    if not user:
        return Response({"details": "invalid user and password"}, status=400)
    if not user.is_active:
        return Response({"details": "User account is disabled"}, status=400)
    
    refresh =RefreshToken.for_user(user)
    return Response({
        'message': 'login successfully',
        'user': UserSerializer(user).data,
        'tokens': {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    })
 
    


    # serializer = UserLoginSerializer(data = request.data)
    # if serializer.is_valid():
    #     user = serializer.validated_data['user']
    #     refresh = RefreshToken.for_user(user)
    #     return Response({
    #         'message': 'login successfully',
    #         'user': UserSerializer(user).data,
    #         'tokens': {
    #             'refresh': str(refresh),
    #             'access': str(refresh.access_token),
    #         }
    #     })
    
    err = serializer.errors
    return Response({'error': err}, status=400)

@api_view(['GET'])
def stories(request):
    print(request.user)
    return Response({'stories': []})