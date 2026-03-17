from django.contrib import admin
from content.models import StoryMentions, Story, StoryViewer, StoryMusic, Post, PostImages, PostMusic,Music, PostLike, Postsave

# Register your models here.
admin.site.register(Music)
admin.site.register(Story)
admin.site.register(StoryMentions)
admin.site.register(StoryViewer)
admin.site.register(StoryMusic)
admin.site.register(Post)
admin.site.register(PostMusic)
admin.site.register(PostImages)
admin.site.register(PostLike)
admin.site.register(Postsave)