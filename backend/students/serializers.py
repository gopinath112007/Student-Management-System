import re
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    student_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'student_id',
            'name',
            'register_number',
            'email',
            'phone',
            'department',
            'year',
            'gender',
            'date_of_birth',
            'address',
            'created_date',
        ]
        read_only_fields = ['id', 'student_id', 'created_date']

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Student name cannot be empty.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Student name must be at least 2 characters long.")
        return value.strip()

    def validate_register_number(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Register number is required.")
        val = value.strip().upper()
        # Check uniqueness during creation / update
        instance = getattr(self, 'instance', None)
        if Student.objects.filter(register_number__iexact=val).exclude(pk=getattr(instance, 'pk', None)).exists():
            raise serializers.ValidationError("A student with this register number already exists.")
        return val

    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Email address is required.")
        val = value.strip().lower()
        # Check email format
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, val):
            raise serializers.ValidationError("Enter a valid email address.")
        instance = getattr(self, 'instance', None)
        if Student.objects.filter(email__iexact=val).exclude(pk=getattr(instance, 'pk', None)).exists():
            raise serializers.ValidationError("A student with this email address already exists.")
        return val

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Phone number is required.")
        cleaned = re.sub(r'[\s\-\(\)\+]', '', value)
        if not cleaned.isdigit():
            raise serializers.ValidationError("Phone number must contain only numeric digits.")
        if len(cleaned) < 7 or len(cleaned) > 15:
            raise serializers.ValidationError("Phone number must be between 7 and 15 digits long.")
        return value.strip()

    def validate_year(self, value):
        if value not in [1, 2, 3, 4]:
            raise serializers.ValidationError("Academic year must be between 1 and 4.")
        return value

    def validate_department(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Department is required.")
        return value.strip()
