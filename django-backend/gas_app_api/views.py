from rest_framework import generics, viewsets, filters
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwner
from gas_app.models import Car, Fillup
from .serializers import CarSerializer, FillupSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Min, Max, Avg, Count, F
from rest_framework.response import Response
from .filters import CarFilter, FillupFilter


class FillupViewSet(viewsets.ModelViewSet):
    serializer_class = FillupSerializer
    lookup_field = "id"
    filter_backends = [DjangoFilterBackend]
    filterset_class = FillupFilter
    # filterset_fields = ('user__user_name','date')

    queryset = Fillup.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'retrieve']:
            self.permission_classes = [IsAuthenticated, IsOwner]
        elif self.action in ['create']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()


class CarViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    lookup_field = "id"
    filter_backends = [DjangoFilterBackend]
    filterset_class = CarFilter
    # filterset_fields = ('user__user_name','status',)

    queryset = Car.objects.all()

    def get_queryset(self):
        return Car.objects.annotate(total_distance=Sum('fillups__trip_distance')).annotate(first_fillup=Min('fillups__date')).annotate(last_fillup=Max('fillups__date')).annotate(num_fillups=Count('fillups__id')).annotate(gallons_filled=Sum('fillups__gallons'))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'retrieve']:
            self.permission_classes = [IsAuthenticated, IsOwner]
        elif self.action in ['create']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()


@api_view()
def Stats(request):
    user = request.query_params.get('user')
    car = request.query_params.get('car')

    fillups = Fillup.objects.filter(user__user_name=user)
    cars = Car.objects.filter(user__user_name=user)

    if car != None:
        fillups = fillups.filter(car=car)

    min_price = fillups.aggregate(Min('price_per_gallon'))
    max_price = fillups.aggregate(Max('price_per_gallon'))
    first_fillup = fillups.aggregate(Min('date'))
    last_fillup = fillups.aggregate(Max('date'))

    total_spent = fillups.annotate(total_sale=F('price_per_gallon') * F('gallons')).aggregate(Sum('total_sale'))
    total_driven = fillups.aggregate(Sum('trip_distance'))
    gallons_filled = fillups.aggregate(Sum('gallons'))

    avg_mpg = 0
    if gallons_filled['gallons__sum'] > 0:
        avg_mpg = total_driven['trip_distance__sum'] / gallons_filled['gallons__sum']

    fillup_count = fillups.count()
    car_count = cars.count()

    return Response({
        "message": "idk dude",
        "user": user,
        "car": car,
        "first_fillup": first_fillup['date__min'],
        "last_fillup": last_fillup['date__max'],
        "min_price": min_price['price_per_gallon__min'],
        "max_price": max_price['price_per_gallon__max'],
        "fillup_count": fillup_count,
        "car_count": car_count,
        "total_spent": round(total_spent['total_sale__sum'], 2),
        "total_driven": round(total_driven['trip_distance__sum'], 4),
        "gallons_filled": round(gallons_filled['gallons__sum'], 4),
        "avg_mpg": round(avg_mpg, 4),
    })

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