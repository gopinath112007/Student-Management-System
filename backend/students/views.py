from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on Student records.
    Provides GET /api/students/, POST /api/students/, GET /api/students/{id}/,
    PUT /api/students/{id}/, PATCH /api/students/{id}/, DELETE /api/students/{id}/
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all()
        
        # Search parameters
        search = self.request.query_params.get('search', None)
        name = self.request.query_params.get('name', None)
        register_number = self.request.query_params.get('register_number', None)
        department = self.request.query_params.get('department', None)
        year = self.request.query_params.get('year', None)

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(register_number__icontains=search)
            )

        if name:
            queryset = queryset.filter(name__icontains=name)

        if register_number:
            queryset = queryset.filter(register_number__icontains=register_number)

        if department:
            queryset = queryset.filter(department__iexact=department)

        if year:
            try:
                year_int = int(year)
                queryset = queryset.filter(year=year_int)
            except ValueError:
                pass

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "status": "error",
                    "message": "Validation failed.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "status": "success",
                "message": "Student created successfully.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response(
                {
                    "status": "error",
                    "message": "Validation failed.",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_update(serializer)
        return Response(
            {
                "status": "success",
                "message": "Student updated successfully.",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {
                "status": "success",
                "message": "Student record deleted successfully."
            },
            status=status.HTTP_200_OK
        )
