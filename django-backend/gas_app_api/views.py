from rest_framework import generics, viewsets, filters
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly
from gas_app.models import Car, Fillup
from .serializers import CarSerializer, FillupSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response



class FillupList(generics.ListCreateAPIView):
    queryset = Fillup.fillupobjects.all()
    serializer_class = FillupSerializer
    

class FillupDetail(generics.RetrieveDestroyAPIView):
    queryset = Fillup.objects.all()
    serializer_class = FillupSerializer


class CarList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CarSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Car, slug=item)

# class CarList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Car.carobjects.all()

#     def list(self, request):
#         serializer_class = CarSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)

#     def create(self, request):
#         pass

#     def retrieve(self, request):
#         pass

#     def update(self, request):
#         pass

#     def partial_update(self, request):
#         pass

#     def destroy(self, request):
#         pass



# class CarList(generics.ListCreateAPIView):
#     queryset = Car.carobjects.all()
#     serializer_class = CarSerializer
    

# class CarDetail(generics.RetrieveDestroyAPIView):
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer