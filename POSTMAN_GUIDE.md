# Postman API Testing Guide – Student Management System

This document provides a comprehensive test suit and step-by-step instructions for testing all REST API endpoints of the Student Management System using **Postman** or **cURL**.

---

## 📌 API Base URL
```
http://127.0.0.1:8000/api/students/
```

---

## 🧪 Comprehensive Test Cases Suite

### Test Case 1: GET All Students
- **Description**: Fetch all registered student records from database.
- **HTTP Method**: `GET`
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Headers**: `Accept: application/json`
- **Request Body**: None
- **Expected Status Code**: `200 OK`
- **Expected Response**:
```json
[
  {
    "id": 1,
    "student_id": 1,
    "name": "Arun Kumar",
    "register_number": "CS2026001",
    "email": "arun.kumar@college.edu",
    "phone": "9876543210",
    "department": "Computer Science",
    "year": 2,
    "gender": "Male",
    "date_of_birth": "2005-05-15",
    "address": "12, Anna Nagar, Chennai, Tamil Nadu",
    "created_date": "2026-09-16 09:37:57"
  }
]
```

---

### Test Case 2: GET One Student by Valid ID
- **Description**: Retrieve detailed profile for student with ID #1.
- **HTTP Method**: `GET`
- **URL**: `http://127.0.0.1:8000/api/students/1/`
- **Headers**: `Accept: application/json`
- **Request Body**: None
- **Expected Status Code**: `200 OK`
- **Expected Response**:
```json
{
  "id": 1,
  "student_id": 1,
  "name": "Arun Kumar",
  "register_number": "CS2026001",
  "email": "arun.kumar@college.edu",
  "phone": "9876543210",
  "department": "Computer Science",
  "year": 2,
  "gender": "Male",
  "date_of_birth": "2005-05-15",
  "address": "12, Anna Nagar, Chennai, Tamil Nadu",
  "created_date": "2026-09-16 09:37:57"
}
```

---

### Test Case 3: POST Create Valid Student
- **Description**: Register a new student record into system.
- **HTTP Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Vikram Seth",
  "register_number": "EE2026099",
  "email": "vikram.seth@college.edu",
  "phone": "9876501234",
  "department": "Electrical Engineering",
  "year": 1,
  "gender": "Male",
  "date_of_birth": "2006-08-12",
  "address": "56, Park Street, Kolkata"
}
```
- **Expected Status Code**: `201 Created`
- **Expected Response**:
```json
{
  "status": "success",
  "message": "Student created successfully.",
  "data": {
    "id": 6,
    "student_id": 6,
    "name": "Vikram Seth",
    "register_number": "EE2026099",
    "email": "vikram.seth@college.edu",
    "phone": "9876501234",
    "department": "Electrical Engineering",
    "year": 1,
    "gender": "Male",
    "date_of_birth": "2006-08-12",
    "address": "56, Park Street, Kolkata",
    "created_date": "2026-09-16 09:54:00"
  }
}
```

---

### Test Case 4: POST Missing Required Field (Validation Failure)
- **Description**: Attempt to register student without providing `name`.
- **HTTP Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "register_number": "CS2026999",
  "email": "noname@college.edu",
  "phone": "9876543210",
  "department": "Computer Science",
  "year": 2,
  "gender": "Male",
  "date_of_birth": "2005-01-01"
}
```
- **Expected Status Code**: `400 Bad Request`
- **Expected Response**:
```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": {
    "name": [
      "This field is required."
    ]
  }
}
```

---

### Test Case 5: POST Duplicate Register Number (Uniqueness Failure)
- **Description**: Attempt to register student with an existing `register_number` (`CS2026001`).
- **HTTP Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Another Arun",
  "register_number": "CS2026001",
  "email": "another@college.edu",
  "phone": "9876543210",
  "department": "Computer Science",
  "year": 2,
  "gender": "Male",
  "date_of_birth": "2005-05-15"
}
```
- **Expected Status Code**: `400 Bad Request`
- **Expected Response**:
```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": {
    "register_number": [
      "A student with this register number already exists."
    ]
  }
}
```

---

### Test Case 6: POST Invalid Email Format (Syntax Failure)
- **Description**: Submit student with invalid email syntax (`invalid-email-format`).
- **HTTP Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Rohan Das",
  "register_number": "ME2026044",
  "email": "invalid-email-format",
  "phone": "9876543210",
  "department": "Mechanical Engineering",
  "year": 3,
  "gender": "Male",
  "date_of_birth": "2004-04-04"
}
```
- **Expected Status Code**: `400 Bad Request`
- **Expected Response**:
```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": {
    "email": [
      "Enter a valid email address."
    ]
  }
}
```

---

### Test Case 7: PUT Valid Student Update
- **Description**: Update phone number and address of student #1.
- **HTTP Method**: `PUT`
- **URL**: `http://127.0.0.1:8000/api/students/1/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Arun Kumar",
  "register_number": "CS2026001",
  "email": "arun.kumar@college.edu",
  "phone": "9998887770",
  "department": "Computer Science",
  "year": 2,
  "gender": "Male",
  "date_of_birth": "2005-05-15",
  "address": "Flat 402, Skyline Towers, Chennai, Tamil Nadu"
}
```
- **Expected Status Code**: `200 OK`
- **Expected Response**:
```json
{
  "status": "success",
  "message": "Student updated successfully.",
  "data": {
    "id": 1,
    "student_id": 1,
    "name": "Arun Kumar",
    "register_number": "CS2026001",
    "email": "arun.kumar@college.edu",
    "phone": "9998887770",
    "department": "Computer Science",
    "year": 2,
    "gender": "Male",
    "date_of_birth": "2005-05-15",
    "address": "Flat 402, Skyline Towers, Chennai, Tamil Nadu",
    "created_date": "2026-09-16 09:37:57"
  }
}
```

---

### Test Case 8: PUT Invalid Student ID (404 Not Found)
- **Description**: Update non-existent student record ID #9999.
- **HTTP Method**: `PUT`
- **URL**: `http://127.0.0.1:8000/api/students/9999/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Ghost Student",
  "register_number": "GH2026999",
  "email": "ghost@college.edu",
  "phone": "9876543210",
  "department": "Civil Engineering",
  "year": 1,
  "gender": "Other",
  "date_of_birth": "2000-01-01"
}
```
- **Expected Status Code**: `404 Not Found`
- **Expected Response**:
```json
{
  "detail": "Not found."
}
```

---

### Test Case 9: DELETE Valid Student Record
- **Description**: Delete student record with ID #5.
- **HTTP Method**: `DELETE`
- **URL**: `http://127.0.0.1:8000/api/students/5/`
- **Headers**: `Accept: application/json`
- **Request Body**: None
- **Expected Status Code**: `200 OK`
- **Expected Response**:
```json
{
  "status": "success",
  "message": "Student record deleted successfully."
}
```

---

### Test Case 10: DELETE Invalid Student ID (404 Not Found)
- **Description**: Attempt to delete already deleted or non-existent student ID #9999.
- **HTTP Method**: `DELETE`
- **URL**: `http://127.0.0.1:8000/api/students/9999/`
- **Headers**: `Accept: application/json`
- **Request Body**: None
- **Expected Status Code**: `404 Not Found`
- **Expected Response**:
```json
{
  "detail": "Not found."
}
```
