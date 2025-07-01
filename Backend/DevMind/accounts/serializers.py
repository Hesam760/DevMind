from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_picture = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password','profile_picture', 'date_joined')
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'is_premium': {'required': False, 'default': False}
        }

    def create(self, validated_data) -> CustomUser:
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user