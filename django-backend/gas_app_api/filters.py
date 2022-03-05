from rest_framework import generics
from django_filters import rest_framework as filters
from gas_app.models import Car, Fillup


class FillupFilter(filters.FilterSet):
    date = filters.DateFromToRangeFilter()

    class Meta:
        model = Fillup
        fields = ['user__user_name','date','car','fuel_grade']


class CarFilter(filters.FilterSet):

    class Meta:
        model = Car
        fields = ['user__user_name','status']