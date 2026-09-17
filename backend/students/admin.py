from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'register_number', 'email', 'department', 'year', 'created_date')
    list_filter = ('department', 'year', 'gender')
    search_fields = ('name', 'register_number', 'email')
    ordering = ('-created_date',)
