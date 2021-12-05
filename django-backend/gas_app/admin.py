from django.contrib import admin
from . import models

# admin.site.register(models.Fillup)
# admin.site.register(models.Car)

@admin.register(models.Fillup)
class FillupAdmin(admin.ModelAdmin):
    list_display = ("user", "date", "price_per_gallon", "trip_distance", "gallons", "car", "total_sale", "mpg")

@admin.register(models.Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("user", "make", "model", "model_year", "status")