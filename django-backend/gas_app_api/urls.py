from django.urls import path
from .views import FillupList, FillupDetail, CarList, CarDetail

app_name = 'gas_app_api'

urlpatterns = [
    path('<int:pk>/', CarDetail.as_view(), name='cardetailcreate'),
    path('cars/', CarList.as_view(), name='carlistcreate'),
    path('<int:pk>/', FillupDetail.as_view(), name='fillupdetailcreate'),
    path('fillups/', FillupList.as_view(), name='filluplistcreate'),
]