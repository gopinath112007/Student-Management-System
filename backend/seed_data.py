import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from students.models import Student

sample_students = [
    {
        "name": "Arun Kumar",
        "register_number": "CS2026001",
        "email": "arun.kumar@college.edu",
        "phone": "9876543210",
        "department": "Computer Science",
        "year": 2,
        "gender": "Male",
        "date_of_birth": "2005-05-15",
        "address": "12, Anna Nagar, Chennai, Tamil Nadu"
    },
    {
        "name": "Priya Sharma",
        "register_number": "EC2026042",
        "email": "priya.sharma@college.edu",
        "phone": "9123456780",
        "department": "Electronics & Communication",
        "year": 3,
        "gender": "Female",
        "date_of_birth": "2004-09-20",
        "address": "45, MG Road, Bengaluru, Karnataka"
    },
    {
        "name": "Gokul Nath",
        "register_number": "ME2026089",
        "email": "gokul.nath@college.edu",
        "phone": "9988776655",
        "department": "Mechanical Engineering",
        "year": 1,
        "gender": "Male",
        "date_of_birth": "2006-01-10",
        "address": "78, Gandhi Circle, Coimbatore, Tamil Nadu"
    },
    {
        "name": "Sneha Reddy",
        "register_number": "IT2026015",
        "email": "sneha.reddy@college.edu",
        "phone": "9845012345",
        "department": "Information Technology",
        "year": 4,
        "gender": "Female",
        "date_of_birth": "2003-11-28",
        "address": "101, Jubilee Hills, Hyderabad, Telangana"
    },
    {
        "name": "Karthik Raja",
        "register_number": "CE2026007",
        "email": "karthik.raja@college.edu",
        "phone": "9765432109",
        "department": "Civil Engineering",
        "year": 2,
        "gender": "Male",
        "date_of_birth": "2005-03-04",
        "address": "33, Cross Street, Madurai, Tamil Nadu"
    }
]

def seed():
    print("Seeding student database...")
    for data in sample_students:
        student, created = Student.objects.get_or_create(
            register_number=data["register_number"],
            defaults=data
        )
        if created:
            print(f"Added: {student.name} ({student.register_number})")
        else:
            print(f"Exists: {student.name} ({student.register_number})")
    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
