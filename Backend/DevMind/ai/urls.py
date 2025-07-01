from django.urls import path
from . import views

urlpatterns = [
    path('ask/', views.AIChatView.as_view() ,name='ask'),
    
]
