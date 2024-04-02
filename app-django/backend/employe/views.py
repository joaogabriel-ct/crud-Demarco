from rest_framework import generics
from .serializers import EmpregadosSerializer
from .models import Empregados
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperAdminOrReadOnly


class EmpregadosCreateListView(generics.ListCreateAPIView):
    queryset = Empregados.objects.all()
    serializer_class = EmpregadosSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return []

    def perform_create(self, serializer):
        serializer.save()


class EmpregadosRetrieveUpdateDestroyView(
        generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Empregados.objects.all()
    serializer_class = EmpregadosSerializer
