from rest_framework import serializers
from content.models import Story, Post, PostImages, PostLike, Postsave
from authantication.serializers import UserSerializer
from authantication.models import CustomUsers
from zoneinfo import ZoneInfo
from datetime import timedelta
from django.utils import timezone

class storyMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ['media']

class StorySerializer(serializers.ModelSerializer):
    userInfo = serializers.SerializerMethodField(read_only = True)
    stories = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Story
        fields = ['id', 'user', 'media', 'userInfo', 'stories']

    def get_userInfo(self, obj):
        return {'username':obj.user.username, 'profilePic': obj.user.profilePicture.url if obj.user.profilePicture else None}
    
    def get_stories(self, obj):
        now_utc = timezone.now()
        request = self.context.get('request')
        tz = request.headers.get('timezone')
        client_utc = now_utc.astimezone(ZoneInfo(tz))
        localsCutOff = client_utc - timedelta(hours=24)
        recoders = Story.objects.filter(createdAt__gte = localsCutOff, user=obj.user)
        return storyMediaSerializer(recoders, many= True).data
    
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImages
        fields = ['image']
        
    
class PostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(read_only = True)
    user = serializers.SerializerMethodField(read_only = True)
    isLiked = serializers.SerializerMethodField(read_only = True)
    isSaved = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Post
        fields = '__all__'

    def get_images(self, obj):
        data = PostImages.objects.filter(post=obj.id)
        serializer = PostImageSerializer(data, many=True)
        return serializer.data
    
    def get_user(self, obj):
        User = CustomUsers.objects.get(email=obj.user )
        return {'username' :User.username, 'isVerified': User.isVerified, 'profilePic': User.profilePicture.url if User.profilePicture else None}

    def get_isLiked(self, obj):
        request = self.context.get('request')
        return PostLike.objects.filter(user=request.user, post=obj).exists()
    
    def get_isSaved(self, obj):
        request = self.context.get('request')
        return Postsave.objects.filter(user=request.user, post=obj).exists()

