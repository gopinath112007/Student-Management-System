# Student Management System – Full Stack CRUD Web Application

> **Standard Operating Procedure (SOP) Compliant College Project**  
> Built with **React.js**, **Python Django REST Framework (DRF)**, and **SQLite Database**.

---

## 📌 1. Project Overview & Problem Statement
Educational institutions often struggle with manual, fragmented, or spreadsheet-based student record keeping. This leads to duplicate data entries, human errors, slow search capabilities, and lack of real-time insights.

The **Student Management System** is a modern, responsive full-stack web application designed to digitize student records. It enables administrative staff and faculty members to perform full CRUD operations (Create, Read, Update, Delete) with real-time dynamic search, multi-criteria filtering, automatic validations, and analytical dashboard metrics.

---

## 🚀 2. Objectives & Key Features

### Core Objectives
1. **Full CRUD Operations**: Create new student profiles, view directories & profiles, edit student info, and safely delete records with confirmation dialogs.
2. **Instant Search & Filtering**: Dynamically filter students by name, register number, department, or academic year without page reloads.
3. **Dual Validation Engine**: Enforce strict data accuracy both client-side in React and server-side in Django REST Framework serializers.
4. **Analytics Dashboard**: View aggregate student statistics, department distributions, and recently added records.

### Key Features
- **Auto-generated Primary Keys** & Unique constraints (`register_number`, `email`).
- **Responsive Layout**: Table view and Card grid toggle for mobile and desktop screens.
- **Confirmation Dialogs**: Pop-up modal confirmation before record deletion to prevent accidental data loss.
- **Toast Notifications**: Interactive feedback banners for operation success and error notifications.
- **RESTful API**: Standardized JSON response payloads adhering to HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).

---

## 🛠️ 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React.js (Vite) | Single Page Application framework |
| **Styling** | HTML5 + CSS3 (Vanilla CSS System) | Modern glassmorphism design system & micro-animations |
| **Icons** | Lucide React | Clean SVG UI icons |
| **Routing** | React Router v6 | Client-side page navigation |
| **Backend API** | Python 3.11 + Django 5.2 | Web backend framework |
| **REST API** | Django REST Framework (DRF) | Serialization, endpoints, status codes, CORS |
| **CORS Middleware** | `django-cors-headers` | Cross-Origin Resource Sharing handling |
| **Database** | SQLite3 | Relational database engine |
| **API Testing** | Postman / cURL | REST API endpoint testing |
| **Version Control**| Git / GitHub | Code management |

---

## 🏗️ 4. System Architecture

```
User (Browser Interface)
        │
        ▼
React.js Frontend (Vite • http://localhost:5173)
        │
        ▼  [REST API HTTP JSON Requests]
Django REST Framework (http://127.0.0.1:8000/api/students/)
        │
        ▼  [Django ORM]
SQLite Database (backend/db.sqlite3)
```

---

## 📁 5. Directory Structure

```
student management system/
├── backend/
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── students/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── db.sqlite3
│   ├── manage.py
│   └── seed_data.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentTable.jsx
│   │   ├── pages/
│   │   │   ├── AddStudent.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   └── Students.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
├── PROJECT_REPORT.md
├── POSTMAN_GUIDE.md
├── VIVA_QUESTIONS.md
└── ER_DIAGRAM.md
```

---

## 🗄️ 6. Database Schema (Student Table)

| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key, Auto Increment | Auto-generated ID |
| `name` | Varchar(100) | NOT NULL | Full Name of Student |
| `register_number` | Varchar(50) | UNIQUE, NOT NULL | Student Roll/Register Number |
| `email` | Varchar(254) | UNIQUE, NOT NULL | Valid Email Address |
| `phone` | Varchar(15) | NOT NULL | 7-15 digit phone number |
| `department` | Varchar(100) | NOT NULL | Academic Department |
| `year` | Integer | NOT NULL (1 to 4) | Academic Year (1-4) |
| `gender` | Varchar(20) | Choice (Male/Female/Other) | Gender identity |
| `date_of_birth` | Date | NOT NULL | YYYY-MM-DD |
| `address` | Text | Optional | Residential address |
| `created_date` | DateTime | Auto Now Add | Record creation timestamp |

---

## 🔌 7. REST API Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students/` | List all students (Supports `?search=`, `?department=`, `?year=`) | `200 OK` |
| `GET` | `/api/students/{id}/` | Retrieve single student profile by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/students/` | Create a new student record | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/students/{id}/` | Update student profile | `200 OK` / `400 Bad Request` |
| `PATCH` | `/api/students/{id}/` | Partial update student profile | `200 OK` / `400 Bad Request` |
| `DELETE` | `/api/students/{id}/` | Delete student record | `200 OK` / `404 Not Found` |

---

## ⚡ 8. Installation & Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Backend Setup (Django)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install django djangorestframework django-cors-headers

# 3. Apply database migrations
python manage.py makemigrations
python manage.py migrate

# 4. Seed sample student records
python seed_data.py

# 5. Run Django server
python manage.py runserver 127.0.0.1:8000
```
Backend API will run at `http://127.0.0.1:8000/api/students/`.

---

### Frontend Setup (React)
```bash
# 1. Open a new terminal and navigate to frontend directory
cd frontend

# 2. Install npm packages
npm install

# 3. Start development server
npm run dev
```
Frontend Web App will open at `http://localhost:5173/`.

---

## 🧪 9. API Testing (Postman)
See [POSTMAN_GUIDE.md](file:///c:/Users/arumu/OneDrive/Desktop/Portfolio/student%20management%20system/POSTMAN_GUIDE.md) for complete details on executing 10 test cases covering GET, POST, PUT, DELETE, and validation failure scenarios.

---

## 🎓 10. Viva Voice Preparation
See [VIVA_QUESTIONS.md](file:///c:/Users/arumu/OneDrive/Desktop/Portfolio/student%20management%20system/VIVA_QUESTIONS.md) for 20+ detailed viva questions and answers covering Django ORM, REST principles, React state management, and CORS architecture.

---

## 🔮 11. Future Enhancements
- User Authentication & Role-Based Access Control (Admin vs. Faculty vs. Student logins).
- Export Student Directory to Excel / PDF report.
- Profile Photo upload feature using Django Media Storage.
- Course registration & grade tracking integration.
