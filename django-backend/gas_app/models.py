from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, datetime
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


STATUS = [('Active', 'Active'), ('Inactive', 'Inactive')]
FUEL_GRADE = [('Regular', 'Regular'), ('Mid-grade', 'Mid-grade'), ('Premium', 'Premium'), ('Diesel', 'Diesel')]

class Fillup(models.Model):

    class FillupObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() #.filter()

    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    price_per_gallon = models.FloatField(validators=[MinValueValidator(0.0)])
    trip_distance = models.FloatField(validators=[MinValueValidator(0.0)])
    gallons = models.FloatField(validators=[MinValueValidator(0.0)])
    car = models.ForeignKey('Car',on_delete=models.CASCADE, related_name='fillups')
    fuel_grade = models.CharField(max_length=10, choices=FUEL_GRADE, default='Regular')
    objects = models.Manager() # default manager
    fillupobjects = FillupObjects() # custom manager

    class Meta:
        ordering = ('date',)

    @property
    def total_sale(self):
        return round(self.price_per_gallon*self.gallons, 2)

    @property
    def mpg(self):
        if self.gallons == 0:
            return 0
        else:
            return round(self.trip_distance/self.gallons, 4)


class Car(models.Model):

    class CarObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() #.filter()

    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    make = models.CharField(max_length=25)
    model = models.CharField(max_length=25)
    model_year = models.IntegerField(validators=[MaxValueValidator(datetime.today().year+1)])
    status = models.CharField(max_length=10,choices=STATUS,default='Active')
    objects = models.Manager() # default manager
    carobjects = CarObjects() # custom manager

    # @property
    # def distance_driven(self):
    #     return self.fillups.aggregate(sum('trip__distance'))

    def __str__(self):
        return self.name
