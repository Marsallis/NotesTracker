from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

        #method that will be called when we want to create a new version of a user
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user