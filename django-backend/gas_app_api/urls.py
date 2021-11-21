from django.urls import path
from .views import FillupList, FillupDetail, CarList, CarDetail, CreateCar, AdminCarDetail, EditCar, DeleteCar

app_name = 'gas_app_api'

# urlpatterns = [
#     # path('cars/<int:pk>/', CarDetail.as_view(), name='cardetailcreate'),
#     path('cars/', CarList.as_view(), name='carlistcreate'),
#     path('fillups/<int:pk>/', FillupDetail.as_view(), name='fillupdetailcreate'),
#     path('fillups/', FillupList.as_view(), name='filluplistcreate'),
# ]

urlpatterns = [

    path('post/<str:pk>/', CarDetail.as_view(), name='detailpost'),
    # path('search/', PostListDetailfilter.as_view(), name='searchpost'),
    # Car Admin URLs
    path('cars/', CarList.as_view(), name='carlist'),
    path('cars/create/', CreateCar.as_view(), name='createcar'),
    path('cars/edit/postdetail/<int:pk>/', AdminCarDetail.as_view(), name='admindetailpost'),
    path('cars/edit/<int:pk>/', EditCar.as_view(), name='editcar'),
    path('cars/delete/<int:pk>/', DeleteCar.as_view(), name='deletecar'),

    path('fillups/<int:pk>/', FillupDetail.as_view(), name='fillupdetailcreate'),
    path('fillups/', FillupList.as_view(), name='filluplistcreate'),
]