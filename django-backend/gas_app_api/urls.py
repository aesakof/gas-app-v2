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
    path('', CarList.as_view(), name='listpost'),
    path('cars/', CarList.as_view(), name='carlistcreate'),

    path('post/<str:pk>/', CarDetail.as_view(), name='detailpost'),
    # path('search/', PostListDetailfilter.as_view(), name='searchpost'),
    # Post Admin URLs
    path('admin/create/', CreateCar.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', AdminCarDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditCar.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeleteCar.as_view(), name='deletepost'),

    path('fillups/<int:pk>/', FillupDetail.as_view(), name='fillupdetailcreate'),
    path('fillups/', FillupList.as_view(), name='filluplistcreate'),
]