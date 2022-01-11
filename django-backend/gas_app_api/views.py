from rest_framework import generics, viewsets, filters
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly
from gas_app.models import Car, Fillup
from .serializers import CarSerializer, FillupSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Min, Max, Avg, Count
from rest_framework.response import Response


class FillupViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CarViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Car.objects.annotate(total_distance=Sum('fillups__trip_distance')).annotate(first_fillup=Min('fillups__date')).annotate(last_fillup=Max('fillups__date')).annotate(num_fillups=Count('fillups__id')).annotate(gallons_filled=Sum('fillups__gallons'))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# # Display Fillups
# class FillupList(generics.ListCreateAPIView):
#     queryset = Fillup.fillupobjects.all()
#     serializer_class = FillupSerializer
    
# # Fillup Admin
# class CreateFillup(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Fillup.objects.all()
#     serializer_class = FillupSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class FillupDetail(generics.RetrieveAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Fillup.objects.all()
#     serializer_class = FillupSerializer

# class EditFillup(generics.UpdateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Fillup.objects.all()
#     serializer_class = FillupSerializer

# class DeleteFillup(generics.RetrieveDestroyAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Fillup.objects.all()
#     serializer_class = FillupSerializer


# # Display Cars
# class CarList(generics.ListAPIView):
#     # queryset = Car.objects.all()
#     serializer_class = CarSerializer

#     def get_queryset(self):
#         return Car.objects.annotate(total_distance=Sum('fillups__trip_distance')).annotate(first_fillup=Min('fillups__date')).annotate(last_fillup=Max('fillups__date')).annotate(num_fillups=Count('fillups__id')).annotate(gallons_filled=Sum('fillups__gallons'))

# # Car Admin
# class CreateCar(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class CarDetail(generics.RetrieveAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer

# class EditCar(generics.UpdateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer

# class DeleteCar(generics.RetrieveDestroyAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer