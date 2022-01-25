from django.urls import path
from .views import CheckAuthentication, CustomUserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('checkauth/', CheckAuthentication, name="checkauth")
]