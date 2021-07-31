from rest_framework import serializers
from gas_app.models import Fillup, Car

class FillupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fillup
        fields = ('id', 'username', 'date', 'price_per_gallon', 'trip_distance', 'gallons', 'car', 'total_sale', 'mpg')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('id', 'username', 'name', 'make', 'model', 'model_year', 'status')


