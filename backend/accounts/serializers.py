from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'full_name', 'email', 'avatar', 'resume', 'github_link')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    avatar = serializers.FileField(required=False, allow_null=True)
    resume = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('full_name', 'email', 'password', 'confirm_password', 'avatar', 'resume')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields must match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        avatar = validated_data.pop('avatar', None)
        resume = validated_data.pop('resume', None)
        
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            avatar=avatar,
            resume=resume
        )
        return user

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'full_name': self.user.full_name,
            'email': self.user.email,
            'avatar': self.user.avatar.url if self.user.avatar else None,
            'resume': self.user.resume.url if self.user.resume else None,
            'github_link': self.user.github_link,
        }
        return data

from .models import SavedJob, JobApplication

class SavedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedJob
        fields = ('id', 'job_id', 'created_at')
        read_only_fields = ('id', 'created_at')


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ('id', 'job_id', 'status', 'applied_date')
        read_only_fields = ('id', 'applied_date')



