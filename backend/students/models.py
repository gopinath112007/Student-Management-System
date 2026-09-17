from django.db import models

class Student(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    YEAR_CHOICES = (
        (1, '1st Year'),
        (2, '2nd Year'),
        (3, '3rd Year'),
        (4, '4th Year'),
    )

    name = models.CharField(max_length=100, help_text="Full Name of the student")
    register_number = models.CharField(max_length=50, unique=True, help_text="Unique Register / Roll Number")
    email = models.EmailField(unique=True, help_text="Unique Email Address")
    phone = models.CharField(max_length=15, help_text="Contact Phone Number")
    department = models.CharField(max_length=100, help_text="Academic Department name")
    year = models.IntegerField(choices=YEAR_CHOICES, help_text="Academic Year (1-4)")
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='Male')
    date_of_birth = models.DateField(help_text="Date of Birth (YYYY-MM-DD)")
    address = models.TextField(blank=True, default='', help_text="Residential Address")
    created_date = models.DateTimeField(auto_now_add=True, help_text="Record Creation Timestamp")

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return f"{self.name} ({self.register_number})"
