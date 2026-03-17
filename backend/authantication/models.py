from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUsers(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    petName = models.CharField(max_length=50 , blank=True, null= True)
    isVerified = models.BooleanField(default= False)
    createdAt = models.DateTimeField(auto_now_add= True)
    updatedAt = models.DateTimeField(auto_now_add= True)
    profilePicture = models.ImageField(upload_to='profile picture', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email