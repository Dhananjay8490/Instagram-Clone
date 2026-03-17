from django.db import models

# Create your models here.
class ChatMessage(models.Model):
    room = models.CharField(max_length=255)
    sentBy = models.CharField(max_length=255, blank=True, null=True)
    sentTo = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.room}] {self.message[:20]}"