from rest_framework import serializers
from gas_app.models import Fillup, Car

class FillupSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.user_name", read_only=True)
    car_name= serializers.CharField(source="car.name", read_only=True)

    class Meta:
        model = Fillup
        fields = ('id', 'date', 'price_per_gallon', 'trip_distance', 'gallons', 'car_name', 'car', 'total_sale', 'mpg', 'username')


class CarSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.user_name", read_only=True)

    total_distance = serializers.FloatField(read_only=True)
    first_fillup = serializers.DateField(read_only=True)
    last_fillup = serializers.DateField(read_only=True)
    num_fillups = serializers.IntegerField(read_only=True)
    gallons_filled = serializers.FloatField(read_only=True)

    class Meta:
        model = Car
        fields = ('id', 'name', 'make', 'model', 'model_year', 'status', 'username', 'total_distance', 'first_fillup', 'last_fillup', 'num_fillups', 'gallons_filled')


