from django.db import models
from uuid import uuid4
from authantication.models import CustomUsers

class Music(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    songName = models.CharField(max_length=400)
    songWriter = models.CharField(max_length=400)
    composer = models.CharField(max_length=400)
    lyricst = models.CharField(max_length=400)
    movie = models.CharField(max_length=400)
    year = models.CharField(max_length=400)
    isAlbum = models.BooleanField(default=False)
    file = models.FileField(upload_to='Music')

    class Meta:
        verbose_name = 'Music'
        verbose_name_plural = 'Musics'

class Story(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    media = models.FileField(upload_to='content/story')
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    createdAt =  models.DateTimeField(auto_now_add=True)

    
    class Meta:
        verbose_name = 'story'
        verbose_name_plural = 'stories'

    def __str__(self):
        return self.user.email + ' views'

class StoryMentions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    mentionedUser = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Story Mention'
        verbose_name_plural = 'Story Mentions'

class StoryViewer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)
    createdAt =  models.DateTimeField(auto_now_add=True)

class StoryMusic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    post = models.ForeignKey(Story, on_delete=models.CASCADE)
    Music = models.ForeignKey(Music, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'story music'
        verbose_name_plural = 'story musics'

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    caption = models.CharField(max_length=1000, null=True, blank=True)
    hashtags = models.CharField(max_length=1000, null=True, blank=True)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    likeCounts = models.IntegerField()
    commentsCounts = models.IntegerField()
    viewsCounts = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    edited = models.BooleanField(default=False)
    archive = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'

class PostImages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='Post', null=True, blank=True)


    class Meta:
        verbose_name = 'Post Image'
        verbose_name_plural = 'Post Images'

class PostMusic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    Music = models.ForeignKey(Music, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
 
    class Meta:
        verbose_name = 'Post Music'
        verbose_name_plural = 'Post Musics'

class PostLike(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    createdAt =  models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Post like'
        verbose_name_plural = 'Post Likes'
        
    def __str__(self):
        return self.user.username + ' liked ' + self.post.user.username + " s post."

    
class Postsave(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    createdAt =  models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Post saved'
        verbose_name_plural = 'Post saves'
        
    def __str__(self):
        return self.user.username + ' saved ' + self.post.user.username + " s post."

    


