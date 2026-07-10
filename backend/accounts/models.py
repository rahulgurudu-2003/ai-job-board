from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    avatar = models.FileField(upload_to='avatars/', null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    github_link = models.URLField(max_length=500, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

class SavedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_jobs')
    job_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job_id')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - Job {self.job_id}"


class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('Applied', 'Applied'),
        ('Under Review', 'Under Review'),
        ('Interview', 'Interview'),
        ('Offered', 'Offered'),
        ('Rejected', 'Rejected'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    job_id = models.IntegerField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Under Review')
    applied_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job_id')
        ordering = ['-applied_date']

    def __str__(self):
        return f"{self.user.email} - Job {self.job_id} ({self.status})"


