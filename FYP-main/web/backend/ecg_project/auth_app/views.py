from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os


class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"id": user.id, "username": user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token = AccessToken.for_user(user)
            return Response({'access': str(token)}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # Only allow authenticated users

    def get(self, request):
        return Response({'message': 'You are having a valid token'}, status=status.HTTP_200_OK)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'user': UserSerializer(request.user).data}, status=status.HTTP_200_OK)


class DoctorListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication to access

    def get_queryset(self):
        # Filter users where user_type is "doctor"
        return CustomUser.objects.filter(user_type='doctor')


class UploadProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]  # Only allow authenticated users

    def post(self, request):
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        image = request.FILES['image']
        username = user.username

        # Define the path for the profile picture
        file_path = os.path.join(
            settings.MEDIA_ROOT, f'profile_pictures/{username}.jpg')

        # Save the image in the media/profile_pictures directory
        fs = FileSystemStorage()

        # If the file already exists, delete it before saving the new one
        if os.path.exists(file_path):
            os.remove(file_path)

        # Save the new image with the username as filename
        fs.save(f'profile_pictures/{username}.jpg', image)

        # Construct the full URL
        full_url = request.build_absolute_uri(
            f'{settings.MEDIA_URL}profile_pictures/{username}.jpg')

        return Response({'image_url': full_url}, status=status.HTTP_201_CREATED)

class UserProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]  # Only allow authenticated users

    def get(self, request):
        user = request.user
        username = user.username
        image_path = os.path.join(
            settings.MEDIA_ROOT, f'profile_pictures/{username}.jpg')

        if os.path.exists(image_path):
            # Construct the full URL
            full_url = request.build_absolute_uri(
                f'{settings.MEDIA_URL}profile_pictures/{username}.jpg')
            return Response({'image_url': full_url}, status=status.HTTP_200_OK)

        return Response({'error': 'Image not found.'}, status=status.HTTP_404_NOT_FOUND)
