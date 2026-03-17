from rest_framework import serializers
from authantication.models import CustomUsers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from chat.models import ChatMessage
from django.db.models import Q


class userRegistratioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only= True, validators =[validate_password])
    password_confirm = serializers.CharField(write_only = True)


    class Meta:
        model = CustomUsers
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirm': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("password do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password') 
        user = CustomUsers(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'petName', 'isVerified', 'profilePicture']
        read_only_fields = ['id', 'isVerified']

class UserLoginSerializer(serializers.Serializer):
    email= serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password =data.get('password')

        if not email or not password:
            raise serializers.ValidationError('email and password are required')
        
        user = authenticate(username=email, password= password)
        if not user:
            raise serializers.ValidationError('invalid email and password')            
        
        if not user.is_active:
            raise serializers.ValidationError('user is disabled')
        
        data['user'] = user
        return data
    
class SuggestedAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'username', 'profilePicture']

class PreviouslyChatSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    class Meta:
        model = CustomUsers
        fields = ['id', 'username', 'profilePicture', 'last_message']

    def get_last_message(self, obj):
        user = self.context['request'].user
        room = f'chat_{min(user.id, obj.id)}_{max(user.id, obj.id)}'        
        last_msg = ChatMessage.objects.filter(
            (Q(sentBy=user.id) & Q(sentTo=obj.id)) | (Q(sentBy=obj.id) & Q(sentTo=user.id))
        ).order_by('-created_at').first()
        if last_msg:
            return {
                'message': last_msg.message,
                'timestamp': last_msg.created_at
            }
        return None