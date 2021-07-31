from rest_framework import generics
from gas_app.models import Car, Fillup
from .serializers import CarSerializer, FillupSerializer


class FillupList(generics.ListCreateAPIView):
    queryset = Fillup.fillupobjects.all()
    serializer_class = FillupSerializer
    

class FillupDetail(generics.RetrieveDestroyAPIView):
    queryset = Fillup.objects.all()
    serializer_class = FillupSerializer


class CarList(generics.ListCreateAPIView):
    queryset = Car.carobjects.all()
    serializer_class = CarSerializer
    

class CarDetail(generics.RetrieveDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer