from rest_framework import serializers
from gas_app.models import Fillup, Car

class FillupSerializer(serializers.ModelSerializer):

    # username = serializers.SerializerMethodField()

    # def get_username(self, obj):
    #     return obj.username.user_name

    class Meta:
        model = Fillup
        fields = ('id', 'username', 'date', 'price_per_gallon', 'trip_distance', 'gallons', 'car', 'total_sale', 'mpg')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('id', 'username', 'name', 'make', 'model', 'model_year', 'status')


