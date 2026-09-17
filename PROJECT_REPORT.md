# ACADEMIC PROJECT REPORT
## STUDENT MANAGEMENT SYSTEM – FULL STACK CRUD WEB APPLICATION

**Course**: Bachelor of Technology / Computer Science & Engineering  
**Project Standard**: Standard Operating Procedure (SOP) Compliant Web Development  
**Technology Stack**: React.js • Python Django REST Framework • SQLite3  

---

## 1. TITLE OF THE PROJECT
**Student Management System – A Full-Stack CRUD-Based Web Application**

---

## 2. INTRODUCTION
In modern educational administration, effective management of student information is critical to operational success. The **Student Management System** is a web application designed to streamline the administration of student records. Developed using **React.js** for a dynamic user interface and **Django REST Framework (DRF)** for backend API endpoints, the platform offers a centralized database for managing student profiles, registration numbers, academic year progression, contact details, and department allocations.

---

## 3. PROBLEM STATEMENT
Traditional record-keeping methods relying on manual paper files or decentralized spreadsheets suffer from severe vulnerabilities:
- **Data Redundancy & Inconsistency**: Duplicate entries occur across different department files.
- **Time-Consuming Search**: Locating a student's contact or academic record requires tedious manual filtering.
- **Lack of Validation**: Invalid email formats, out-of-bounds phone numbers, or duplicate roll numbers frequently corrupt student registries.
- **Accidental Deletion**: In-memory spreadsheets lack soft-confirmation prompts before records are erased.

---

## 4. OBJECTIVES
- Build a responsive single-page web application implementing Create, Read, Update, and Delete (CRUD) operations.
- Develop standardized REST API endpoints returning structured JSON data.
- Enforce strict client-side (React) and server-side (Django) validation rules to guarantee data integrity.
- Provide dynamic real-time search and multi-criteria department/year filter controls without full page reloads.
- Design an analytics dashboard offering instant statistical overviews of total enrollment and departmental distribution.

---

## 5. SCOPE
- **Frontend**: Single-page navigation using React Router, glassmorphic UI layout, table & card grid toggles, deletion confirmation dialogs, and interactive toast feedback notifications.
- **Backend**: Django ORM models, REST API views/viewsets, URL routing, CORS configuration, database migrations, and structured exception handling.
- **Database**: Relational storage in SQLite3 with unique constraints on register numbers and emails.

---

## 6. EXISTING SYSTEM
Existing manual or legacy spreadsheet systems lack real-time synchronization. Data updates made by one department are not reflected instantly across the institute. Furthermore, spreadsheet systems lack API endpoints for third-party mobile or web integration and expose raw database records to unauthorized modification without audit trails.

---

## 7. PROPOSED SYSTEM
The proposed system establishes a decoupled full-stack architecture:
- **Decoupled Client & Server**: React frontend communicates with Django backend via asynchronous REST API calls (`fetch` / `Axios`).
- **Real-Time Dynamic Filtering**: Search queries filter records in real-time as users type.
- **Automated Validation**: Rejects duplicate registration numbers, duplicate emails, invalid phone digit lengths, and out-of-range academic years (must be 1–4).
- **Safety Confirmations**: Prevents accidental record deletion through pop-up modal confirmation dialogs.

---

## 8. TECHNOLOGY STACK
- **Frontend**: React 18, Vite, React Router DOM v6, Lucide React Icons, HTML5, Vanilla CSS3.
- **Backend**: Python 3.11, Django 5.2, Django REST Framework 3.18.
- **CORS Handling**: `django-cors-headers` middleware.
- **Database**: SQLite3.
- **Tools**: Postman, Git/GitHub.

---

## 9. SYSTEM ARCHITECTURE
```
User (Web Browser Interface)
         │
         ▼
React.js Frontend SPA (Vite • Port 5173)
         │
         ▼ [HTTP REST API JSON Requests]
Django REST Framework (python manage.py runserver • Port 8000)
         │
         ▼ [Django ORM Engine]
SQLite Database (db.sqlite3)
```

---

## 10. DATABASE DESIGN
The relational schema centers on the `Student` entity.

### Table Schema: `students_student`
- `id` (INTEGER, Primary Key, Auto Increment)
- `name` (VARCHAR 100, NOT NULL)
- `register_number` (VARCHAR 50, UNIQUE, NOT NULL)
- `email` (VARCHAR 254, UNIQUE, NOT NULL)
- `phone` (VARCHAR 15, NOT NULL)
- `department` (VARCHAR 100, NOT NULL)
- `year` (INTEGER, NOT NULL)
- `gender` (VARCHAR 20, DEFAULT 'Male')
- `date_of_birth` (DATE, NOT NULL)
- `address` (TEXT, DEFAULT '')
- `created_date` (DATETIME, AUTO_NOW_ADD)

---

## 11. ER DIAGRAM DESCRIPTION
The Entity-Relationship (ER) model defines the `Student` entity as a self-contained domain object with unique constraints on `register_number` and `email`. Primary key `id` guarantees unique identification. Attributes encompass personal identifiers, contact numbers, academic progression indicators, and timestamp fields.

---

## 12. MODULE DESCRIPTION
1. **Dashboard Module**: Calculates enrollment totals, counts unique departments, computes year-wise distribution percentages, and displays recently enrolled students.
2. **Student Directory Module**: Displays all records in a responsive table or grid layout with live search bar and department/year filter dropdowns.
3. **Student Form Module**: Unified component for registering new students and updating existing profiles with live validation feedback.
4. **Detail Profile Module**: Dedicated view presenting comprehensive student details, contact numbers, and residential address.
5. **API & Service Module**: Client-side abstraction layer managing HTTP requests to DRF endpoints.

---

## 13. FRONTEND IMPLEMENTATION
Implemented using React components:
- `Navbar.jsx`: Sticky header navigation bar with active route highlighting.
- `SearchFilter.jsx`: Controlled input elements for search queries and dropdown filters.
- `StudentTable.jsx` & `StudentCard.jsx`: Dual view components for desktop and mobile screen sizes.
- `StudentForm.jsx`: Controlled form state with validation routines.
- `ConfirmationModal.jsx`: Accessible modal dialog triggering deletion events.
- `Notification.jsx`: Auto-dismissing toast alerts.

---

## 14. BACKEND IMPLEMENTATION
Implemented using Django REST Framework:
- `models.py`: Defines ORM model with field types, choices, and indexing.
- `serializers.py`: ModelSerializer executing custom field validators (`validate_register_number`, `validate_email`, `validate_phone`).
- `views.py`: `StudentViewSet` inheriting from `ModelViewSet` with custom query parameter filters.
- `urls.py`: DefaultRouter automatically mapping REST URL routes.
- `settings.py`: CORS headers allowing request origins from React dev server.

---

## 15. REST API IMPLEMENTATION
- `GET /api/students/`: Fetches list of students.
- `POST /api/students/`: Creates a student profile.
- `GET /api/students/{id}/`: Fetches single student record.
- `PUT /api/students/{id}/`: Replaces student profile.
- `PATCH /api/students/{id}/`: Partially updates student profile.
- `DELETE /api/students/{id}/`: Removes student record.

---

## 16. CRUD OPERATIONS
- **Create**: User submits form -> Client validates input -> POST request sent -> Django validates & saves -> Response 201 -> UI updates table.
- **Read**: GET request sent -> Django queries SQLite via ORM -> Returns JSON array -> React renders cards/table.
- **Update**: Edit button clicked -> Form populated with existing data -> PUT request sent -> Django updates record -> Response 200 -> UI reflects changes.
- **Delete**: Delete button clicked -> Confirmation modal prompts user -> DELETE request sent -> Record removed from SQLite -> Response 200 -> List re-fetched.

---

## 17. VALIDATION RULES
1. **Name**: Non-empty, minimum 2 characters.
2. **Register Number**: Non-empty, unique across database.
3. **Email**: Non-empty, standard email syntax, unique across database.
4. **Phone Number**: 7 to 15 numeric digits.
5. **Year**: Integer between 1 and 4.
6. **Date of Birth**: Valid date string (YYYY-MM-DD).

---

## 18. ERROR HANDLING
- **HTTP 400 Bad Request**: Returned on duplicate register numbers, duplicate emails, or missing fields. UI displays error toast banner.
- **HTTP 404 Not Found**: Returned when querying invalid student ID. UI displays friendly "Record Not Found" view.
- **HTTP 500 Server Error**: Caught by DRF exception handlers; returns structured JSON error message.

---

## 19. TESTING METHODOLOGY
The system underwent rigorous automated and manual test procedures covering frontend UI state transitions, backend API route handling, database persistence, and network disconnect states.

---

## 20. TEST CASES MATRIX

| Test ID | Test Case Description | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Create Student with Valid Inputs | Complete valid JSON body | Returns 201 Created & saves record | 201 Created returned & stored | **PASS** |
| **TC02** | Create Student with Missing Name | Missing `name` key | Returns 400 Bad Request with field error | 400 Bad Request returned | **PASS** |
| **TC03** | Create Student with Duplicate Register No | Existing reg no `CS2026001` | Returns 400 Bad Request "already exists" | 400 Bad Request returned | **PASS** |
| **TC04** | Create Student with Invalid Email | Email = `invalid-email` | Returns 400 Bad Request "valid email" | 400 Bad Request returned | **PASS** |
| **TC05** | Read All Students Directory | `GET /api/students/` | Returns 200 OK & JSON array | 200 OK & array returned | **PASS** |
| **TC06** | Read Student Profile by ID | `GET /api/students/1/` | Returns 200 OK & student object | 200 OK & object returned | **PASS** |
| **TC07** | Read Non-Existent Student ID | `GET /api/students/999/` | Returns 404 Not Found | 404 Not Found returned | **PASS** |
| **TC08** | Dynamic Search by Name | Search query `Arun` | Returns records containing `Arun` | Correctly filtered | **PASS** |
| **TC09** | Filter by Department | Department = `Computer Science` | Returns CS department students | Correctly filtered | **PASS** |
| **TC10** | Update Student Phone & Address | Valid `PUT` body to ID #1 | Returns 200 OK & updated data | 200 OK & updated | **PASS** |
| **TC11** | Delete Student with Confirmation | Confirmed `DELETE` ID #5 | Returns 200 OK & removes record | 200 OK & removed | **PASS** |

---

## 21. SCREENSHOTS PLACEHOLDERS & DESCRIPTIONS
1. **Dashboard View**: Displays Total Students counter (5), Department counter (5), Year breakdown progress bars, and Recently Added table.
2. **Student Directory Table View**: Responsive table listing Register Numbers, Names, Badged Departments, Badged Years, Emails, and Action buttons.
3. **Student Directory Cards View**: Grid layout rendering individual student cards for smaller viewports.
4. **Add Student Form**: Clean pre-validated form layout with input focus states and required field markers.
5. **Delete Confirmation Modal**: Accessible pop-up overlay prompting confirmation before record deletion.

---

## 22. CHALLENGES AND SOLUTIONS
- **Challenge 1: CORS Blocking Client Requests**: Browser blocked cross-origin requests from `localhost:5173` to `127.0.0.1:8000`.
  - *Solution*: Installed `django-cors-headers` middleware and configured `CORS_ALLOW_ALL_ORIGINS = True` in `settings.py`.
- **Challenge 2: Dual Backend/Frontend Validation Sync**: Uniqueness validation errors from Django ORM needed clear representation in React UI.
  - *Solution*: Parsed DRF error object dictionary in `api.js` and displayed field-specific messages inside toast alerts.

---

## 23. FUTURE ENHANCEMENTS
- Role-Based Access Control (RBAC) with JWT Authentication.
- Student profile photo upload with AWS S3 / Django Media file storage.
- Attendance and Semester marks management modules.
- Export student lists to Excel (.xlsx) and PDF reports.

---

## 24. CONCLUSION
The **Student Management System** successfully fulfills all requirements outlined in the Standard Operating Procedure (SOP). By combining React's dynamic component architecture with Django REST Framework's robust API and SQLite's reliable storage, the system provides a scalable, secure, and user-friendly solution for managing college student records.

---

## 25. REFERENCES
1. Django Documentation: [https://docs.djangoproject.com/](https://docs.djangoproject.com/)
2. Django REST Framework: [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)
3. React Documentation: [https://react.dev/](https://react.dev/)
4. Vite Guide: [https://vitejs.dev/](https://vitejs.dev/)
