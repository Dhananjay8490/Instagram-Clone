from authantication import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns=[
    path('register/', views.register),
    path('profile/', views.profile),
    path('login/', views.login),
    path('stories/', views.stories),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh ')
]
