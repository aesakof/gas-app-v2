from django.urls import path
from rest_framework import urlpatterns
from rest_framework.routers import SimpleRouter

from .views import CarViewSet, FillupViewSet
# from .views import FillupList, FillupDetail, CreateFillup, EditFillup, DeleteFillup, CarList, CreateCar, CarDetail, EditCar, DeleteCar


app_name = 'gas_app_api'

car_router = SimpleRouter()
car_router.register(r'cars', CarViewSet, basename='Cars')

fillup_router = SimpleRouter()
fillup_router.register(r'fillups', FillupViewSet, basename='Fillups')

urlpatterns = []

urlpatterns += fillup_router.urls
urlpatterns += car_router.urls

# urlpatterns = [
#     # Car URLs
#     path('cars/', CarList.as_view(), name='carlist'),
#     path('cars/create/', CreateCar.as_view(), name='createcar'),
#     path('cars/<int:pk>/', CarDetail.as_view(), name='cardetail'),
#     path('cars/edit/<int:pk>/', EditCar.as_view(), name='editcar'),
#     path('cars/delete/<int:pk>/', DeleteCar.as_view(), name='deletecar'),

#     #Fillup URLs
#     path('fillups/', FillupList.as_view(), name='filluplist'),
#     path('fillups/create/', CreateFillup.as_view(), name='createfillup'),
#     path('fillups/<int:pk>/', FillupDetail.as_view(), name='fillupdetail'),
#     path('fillups/edit/<int:pk>/', EditFillup.as_view(), name='editfillup'),
#     path('fillups/delete/<int:pk>/', DeleteFillup.as_view(), name='deletefillup'),
# ]