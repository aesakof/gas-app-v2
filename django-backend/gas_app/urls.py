from django.urls import path
from django.views.generic import TemplateView

app_name = 'gas_app'

urlpatterns = [
    path('', TemplateView.as_view(template_name="gas_app/index.html")),
]