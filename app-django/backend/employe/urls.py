from django.urls import path
from . import views

urlpatterns = [
    path('empregados/',
         views.EmpregadosCreateListView.as_view(),
         name='list-employe'),
    path('empregados/<int:pk>/',
         views.EmpregadosRetrieveUpdateDestroyView.as_view(),
         name='detail-view-employe'),
]
