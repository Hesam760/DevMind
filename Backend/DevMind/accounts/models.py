from django.db import models
from django.contrib.auth.models import AbstractUser

def user_profile_picture_path(instance, filename):
        return f'user_{instance.id}/profile/{filename}'
    
class CustomUser(AbstractUser):
    """
    Custom user model that extends the default Django user model.
    You can add additional fields here if needed.
    """
    is_premium = models.BooleanField(default=False, verbose_name='is_premium')
    profile_picture = models.ImageField(upload_to=user_profile_picture_path, blank=True, null=True)
    

    def __str__(self):
        return self.username
