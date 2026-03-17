from django.shortcuts import render
from rest_framework.decorators import api_view
from content.models import Story, Post, PostLike, Postsave
from content.serializers import StorySerializer, PostSerializer
from rest_framework.response import Response
from authantication.serializers import SuggestedAccountSerializer, PreviouslyChatSerializer
from authantication.models import CustomUsers
from zoneinfo import ZoneInfo
from datetime import timedelta
from django.utils import timezone
from django.db.models import OuterRef, Subquery
from chat.models import ChatMessage
from chat.serializers import ChatMessageSerializer
from django.db.models import Q



# Create your views here.
@api_view(['GET'])
def story(request):
    tz = request.headers.get('timezone')
    now_utc = timezone.now()
    client_utc = now_utc.astimezone(ZoneInfo(tz))
    localsCutOff = client_utc - timedelta(hours=24)
    qs = Story.objects.filter(user = OuterRef('user'), createdAt__gte = localsCutOff).values('id')[:1]
    data = Story.objects.filter(id=Subquery(qs))
    serializer = StorySerializer(data, many = True, context={'request': request})
    return Response(serializer.data)


    # finalRecord = []
    # userExists = {}

    # for record in serializer.data:
    #     username = record['userInfo']['username']
    #     if username in userExists:
    #         value = userExists[username]['stories']
    #         value.append(record)
    #         userExists[username]['stories'] = value
    #     else:
    #         temp = {}
    #         temp['id'] = record['id']    
    #         temp['username'] =username
    #         temp['profilePic'] = record['userInfo']['profilePic']
    #         temp['stories'] =[record]
    #         userExists[username] = temp
    # finalRecord = userExists.values()


@api_view(['GET'])
def post(request):
    data = Post.objects.all()
    serializer = PostSerializer(data, many=True, context={'request':request})
    return Response(serializer.data)

    
@api_view(['PUT'])
def postUpdateLike(request):
    try:
        data = request.data
        post = Post.objects.get(id=data.get('postId'))
        if data.get('status'):
            post.likeCounts += 1
            post.save()
            PostLike.objects.create(
                user =request.user,
                post=post
            ).save()
        elif data.get('status')== False:
            post.likeCounts -= 1
            post.save()
            PostLike.objects.filter(user=request.user, post=post).delete()
        
        return Response({'likeCounts': post.likeCounts})
    except Exception as e:
        return Response({"detail": str(e)}, status=400)
    
@api_view(['PUT'])
def postUpdateSave(request):
    try:
        data = request.data
        postId = data.get('postId')
        status = data.get('status')
        if status:
            Postsave.objects.create(
            user=request.user,
            post_id = postId
            ).save()
        if status ==  False:
            Postsave.objects.filter(user=request.user, post_id= postId).delete()
        return Response('saved')
    
            
    except Exception as e:
        return Response({'detail' : str(e)}, status=400)
    
@api_view(['GET'])
def getSuggestedAccounts(request):
    try:
        users = CustomUsers.objects.all().exclude(email=request.user)
        return Response(SuggestedAccountSerializer(users, many=True).data)
    except Exception as e:
        return Response({'detail' : str(e)}, status=400)
    
@api_view(['GET'])
def getPreviouslyChat(request):
    try:
        # use case : user logged in
        # faijan login hua
        # faijan ne dsp ko msg kiya, kshipra msg kiya
        # iska mtlb mere ko message section me do chat dikhni chahiye ?
        # so the code for that only 👇
        sentToChats = ChatMessage.objects.filter(sentBy=request.user.id).values('sentTo').distinct() #[{sentTo:2}, {sentTo:3}]
        
        # ayse bhi ho sakta hai ke mene msg nahi kiya but samne wale ne kiya
        # example ashish, tejas dono ne msg kiya to mere ko wo bhi chat me dikhne chahiye
        sentByChats = ChatMessage.objects.filter(sentTo=request.user.id).values('sentBy').distinct() #[{sentBy:5}, {sentBy:6}]

        user_ids = [chat['sentTo'] for chat in sentToChats] # [2, 3]
        user_ids.extend([chat['sentBy'] for chat in sentByChats]) # [2, 3, 5, 6]

        users = CustomUsers.objects.filter(id__in=user_ids).exclude(username=request.user.username) # [2, 3, 5, 6]
        # users = CustomUsers.objects.all()
        serializer =PreviouslyChatSerializer(users, many=True, context={'request':request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail':str(e)}, status=400)

@api_view(['GET'])
def fetchMessages(request):
    try:
        room = request.query_params.get('room')
        print('room', room)
        messages = ChatMessage.objects.filter(room=room).order_by('created_at')
        serializer = ChatMessageSerializer(messages, many=True, context={'request':request})
        return Response(serializer.data)
    except Exception as e:     
        return Response({'detail':str(e)}, status=400)
        
    