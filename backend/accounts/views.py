from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "message": "User registered successfully!"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid or missing refresh token."}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import SavedJob, JobApplication
from .serializers import SavedJobSerializer, JobApplicationSerializer


class SavedJobsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        saved_jobs = SavedJob.objects.filter(user=request.user)
        serializer = SavedJobSerializer(saved_jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        job_id = request.data.get("job_id")
        if job_id is None:
            return Response({"error": "job_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            job_id = int(job_id)
        except ValueError:
            return Response({"error": "job_id must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

        saved_job, created = SavedJob.objects.get_or_create(user=request.user, job_id=job_id)
        if not created:
            saved_job.delete()
            return Response({"message": "Job unsaved successfully.", "saved": False}, status=status.HTTP_200_OK)
        
        serializer = SavedJobSerializer(saved_job)
        data = serializer.data
        data["saved"] = True
        return Response(data, status=status.HTTP_201_CREATED)

class RemoveSavedJobView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, job_id):
        try:
            saved_job = SavedJob.objects.get(user=request.user, job_id=job_id)
            saved_job.delete()
            return Response({"message": "Job unsaved successfully."}, status=status.HTTP_200_OK)
        except SavedJob.DoesNotExist:
            return Response({"error": "Saved job not found."}, status=status.HTTP_404_NOT_FOUND)


class JobApplicationsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        applications = JobApplication.objects.filter(user=request.user)
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request):
        job_id = request.data.get("job_id")
        if job_id is None:
            return Response({"error": "job_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            job_id = int(job_id)
        except ValueError:
            return Response({"error": "job_id must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

        
        if JobApplication.objects.filter(user=request.user, job_id=job_id).exists():
            return Response({"error": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

        application = JobApplication.objects.create(
            user=request.user,
            job_id=job_id,
            status='Under Review'
        )
        serializer = JobApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


