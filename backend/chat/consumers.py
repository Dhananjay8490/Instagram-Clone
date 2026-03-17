from channels.generic.websocket import AsyncJsonWebsocketConsumer
from datetime import datetime
from pymongo import MongoClient
import os
from urllib.parse import quote_plus
from asgiref.sync import sync_to_async
import json

MONGO_USER = "Dhananjay"
MONGO_PASS = "Qwerty22"

client = MongoClient(os.getenv("MONGODB_URI", f"mongodb+srv://{MONGO_USER}:{quote_plus(MONGO_PASS)}@cluster0.p3fho.mongodb.net/"))
db = client["chatdb"]
messages_collection = db["messages"]

class ChatConsumer(AsyncJsonWebsocketConsumer):
    "ws://localhost:8000/ws/chat/room1/"
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        print(">>> WS CONNECT", self.scope.get("path"))
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message = content.get("message")
        sentBy = content.get("sentBy")
        sentTo = content.get("sentTo")

        if not message or not sentBy or not sentTo:
            return

        # Save to MongoDB (sync call wrapped in thread if you want to be strict)
        from chat.models import ChatMessage
        # make the below code async
        
        obj = await sync_to_async(ChatMessage.objects.create)(
            room=self.room_name,
            sentBy=sentBy,
            sentTo=sentTo,
            message=message,
        )
        await sync_to_async(obj.save)()
        # messages_collection.insert_one({
        #     "room": self.room_name,
        #     "message": message,
        #     "created_at": datetime.utcnow(),
        # })

        # Broadcast to room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "message": message,
                "sentBy": sentBy,
                "sentTo": sentTo,
            },
        )

    async def chat_message(self, event):
        await self.send_json({
            "message": event["message"],
            "sentBy": event["sentBy"],
            "sentTo": event["sentTo"],
            "type": event["type"],
        })


class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.id = self.scope["url_route"]["kwargs"]["id"]
        self.group_name = f'notifications_{self.id}'
        print('>>> Notification WS CONNECT', self.scope.get("path"))
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data or '{}')
        event_type = data.get('type') or 'notification'
        payload = data.get("payload") or {}

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": 'notify.message',
                'event_type': event_type,
                "payload": payload,
            }
        )

    async def notify_message(self, event):
        await self.send(text_data=json.dumps({
            "type": event["event_type"],
            "payload": event["payload"],
        }))
