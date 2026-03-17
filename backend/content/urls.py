from content import views
from django.urls import path

urlpatterns=[
    path('story/', views.story),
    path('post/', views.post),
    path('post/like/', views.postUpdateLike),
    path('post/save/', views.postUpdateSave),
    path('suggested-accounts/', views.getSuggestedAccounts),
    path('previously-chat/', views.getPreviouslyChat),
    path('fetch-messages/', views.fetchMessages),

]