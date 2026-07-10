from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView, LogoutView, CurrentUserView, SavedJobsView, RemoveSavedJobView, JobApplicationsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', MyTokenObtainPairView.as_view(), name='auth_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('me/', CurrentUserView.as_view(), name='auth_me'),
    path('saved-jobs/', SavedJobsView.as_view(), name='saved_jobs'),
    path('saved-jobs/<int:job_id>/', RemoveSavedJobView.as_view(), name='remove_saved_job'),
    path('applications/', JobApplicationsView.as_view(), name='job_applications'),
]

