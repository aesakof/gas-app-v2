from rest_framework import generics
from gas_app.models import Car, Fillup
from .serializers import CarSerializer, FillupSerializer


class FillupList(generics.ListCreateAPIView):
    queryset = Fillup.fillupobjects.all()
    serializer_class = FillupSerializer
    pass

class FillupDetail(generics.RetrieveDestroyAPIView):
    pass

class CarList(generics.ListCreateAPIView):
    queryset = Car.carobjects.all()
    serializer_class = CarSerializer
    pass

class CarDetail(generics.RetrieveDestroyAPIView):
    pass