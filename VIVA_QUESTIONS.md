# Viva Voice Questions & Answers Guide – Student Management System

This document provides a comprehensive bank of **22 Viva Voice Questions and Answers** to prepare students for college project defense and external examiner evaluation.

---

## 📚 General & Architecture Questions

### Q1: What is the architecture of your Student Management System?
**Answer**: Our project uses a **decoupled full-stack architecture**. The frontend is built as a Single Page Application (SPA) using **React.js** (bundled with Vite). The backend is built using **Python Django** and **Django REST Framework (DRF)**, connected to an **SQLite3** database via Django ORM. The React frontend communicates with the Django backend asynchronously using RESTful HTTP API calls (JSON format).

---

### Q2: Why did you choose React for the frontend and Django for the backend?
**Answer**: 
- **React** allows building modular, reusable UI components, updating the DOM efficiently using a Virtual DOM, and rendering search/filter results dynamically without full page reloads.
- **Django + DRF** provides a secure, robust backend framework out of the box, offering built-in Object-Relational Mapping (ORM), robust data validation serializers, clean URL routing, and security against common web vulnerabilities (SQL injection, XSS, CSRF).

---

### Q3: What is a REST API and why is it useful here?
**Answer**: REST stands for **Representational State Transfer**. A REST API uses standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) to perform CRUD operations on database resources. It decouples the client from the server, allowing the backend API to serve web clients, mobile apps, or third-party integrations seamlessly.

---

## 🐍 Django & Backend Questions

### Q4: How does Django ORM work in your project?
**Answer**: Django ORM (Object-Relational Mapper) bridges Python code and database SQL statements. We define database schemas as Python classes (`Student` model in `models.py`). Django automatically translates Python queries like `Student.objects.all()` or `Student.objects.filter(department="Computer Science")` into SQL `SELECT` queries executed against SQLite.

---

### Q5: What is the role of `StudentSerializer` in `serializers.py`?
**Answer**: A Serializer in Django REST Framework performs two key roles:
1. **Serialization**: Converts complex Django ORM model instances into native Python datatypes that can easily be rendered into JSON.
2. **Deserialization & Validation**: Converts incoming JSON payload data back into validated Python objects before saving them to the database, enforcing field-level rules (uniqueness, valid email syntax, digit lengths).

---

### Q6: How did you implement unique constraints for Register Number and Email?
**Answer**:
1. **At Model Level**: In `models.py`, `register_number` and `email` are defined with `unique=True`. Django ORM creates SQL `UNIQUE` constraints on SQLite tables.
2. **At Serializer Level**: Custom validator methods (`validate_register_number` and `validate_email`) check if another student already possesses the same register number or email, returning a `400 Bad Request` with a clear validation error.

---

### Q7: What is CORS and how did you configure it?
**Answer**: **CORS** stands for **Cross-Origin Resource Sharing**. Browsers enforce the Same-Origin Policy, blocking HTTP requests from a frontend running on one origin (`http://localhost:5173`) to a backend on another origin (`http://127.0.0.1:8000`). We resolved this by installing `django-cors-headers` middleware in `settings.py` and configuring `CORS_ALLOW_ALL_ORIGINS = True`.

---

### Q8: What HTTP status codes does your REST API return?
**Answer**:
- `200 OK`: Successful GET, PUT, or DELETE request.
- `201 Created`: Successful POST request (new student created).
- `400 Bad Request`: Validation error (missing required fields, duplicate register number/email).
- `404 Not Found`: Student record with requested ID does not exist.
- `500 Internal Server Error`: Unhandled server exception.

---

## ⚛️ React & Frontend Questions

### Q9: How do search and filtering work dynamically without reloading the page?
**Answer**: In `Students.jsx`, search and filter values are maintained in React `useState` hooks (`search`, `department`, `year`). When a user types in the search input or selects a dropdown filter, an `useEffect` hook triggers an asynchronous `fetch` call to `/api/students/?search=...&department=...`. The returned student array updates the `students` state, triggering a clean re-render of the table or card grid.

---

### Q10: What is the difference between `StudentTable.jsx` and `StudentCard.jsx`?
**Answer**:
- `StudentTable.jsx` renders a tabular grid layout optimized for desktop viewports, presenting compact columns with badged department and year indicators.
- `StudentCard.jsx` renders individual card blocks ideal for mobile viewports. Users can toggle between both view modes instantly in the UI.

---

### Q11: How do you prevent accidental student record deletion?
**Answer**: Clicking the Delete button does not immediately execute an API call. Instead, it opens `ConfirmationModal.jsx`, presenting the student's name and register number and requesting explicit confirmation. The DELETE API request is only dispatched when the user clicks "Delete Record".

---

### Q12: How are client-side validation errors displayed in the form?
**Answer**: `StudentForm.jsx` validates input values before dispatching API requests. If a required field is missing or invalid, an `errors` state object is populated (e.g. `errors.name = "Student name is required"`). Red error text messages render directly beneath the corresponding input fields.

---

## 🗄️ Database & Operations Questions

### Q13: Why did you use SQLite for database storage?
**Answer**: SQLite is a lightweight, serverless relational database engine stored as a single file (`db.sqlite3`). It requires zero external database installation, supports full ACID transactions, supports unique key constraints, and is fully integrated with Django ORM, making it ideal for college projects and rapid development.

---

### Q14: How do Django migrations work?
**Answer**: Migrations are Django's way of propagating changes made to Python models into the database schema:
1. `python manage.py makemigrations`: Inspects `models.py` and creates Python migration files inside `students/migrations/`.
2. `python manage.py migrate`: Executes SQL DDL commands to create or modify database tables in SQLite.

---

### Q15: What is the primary key of your Student table?
**Answer**: The primary key is `id` (an auto-incrementing BigAutoField integer generated automatically by Django). We also expose `student_id` in the API serializer as an alias for clarity.

---

### Q16: How do you handle network or backend failure in React?
**Answer**: In `api.js` and page components (`Dashboard.jsx`, `Students.jsx`), API fetch calls are wrapped in `try...catch` blocks. If the Django server is offline or unreachable, an error state is set, displaying a friendly "Backend Connection Warning" card with instructions to start the server.

---

## 🛠️ Advanced Viva Questions

### Q17: What is the difference between `PUT` and `PATCH` HTTP methods?
**Answer**:
- `PUT` replaces the entire student resource with the new request body. All fields must be supplied.
- `PATCH` partially updates specific fields of a student resource without requiring the full object payload.

---

### Q18: What is the purpose of `seed_data.py`?
**Answer**: `seed_data.py` is an automated Python script that uses Django ORM to populate the SQLite database with realistic initial student records across multiple departments and academic years. This allows instant demonstration without manually filling forms.

---

### Q19: What is `package.json` in your frontend directory?
**Answer**: `package.json` is the Node.js manifest file. It lists project metadata, npm dependencies (`react`, `react-router-dom`, `lucide-react`), dev dependencies (`vite`), and executable scripts (`npm run dev`, `npm run build`).

---

### Q20: What is `vite.config.js` and why is proxy configured?
**Answer**: `vite.config.js` configures the Vite build tool. We configured a development server proxy (`/api -> http://127.0.0.1:8000`) so frontend API calls to `/api/students/` are automatically routed to the Django backend port during development.

---

### Q21: How would you scale this application for production use?
**Answer**:
1. Replace SQLite with PostgreSQL or MySQL.
2. Deploy backend using Gunicorn / Uvicorn behind Nginx reverse proxy.
3. Deploy React production build (`dist/`) to AWS S3 / Vercel / Netlify.
4. Implement JWT (JSON Web Tokens) or OAuth2 authentication.

---

### Q22: Can you demonstrate all CRUD operations right now?
**Answer**: Yes!
1. **Create**: Click "Add Student", enter details, and submit.
2. **Read**: View directory table/cards or click "View" to open student details profile.
3. **Update**: Click "Edit", modify phone/address, and save.
4. **Delete**: Click "Delete", confirm pop-up modal, and verify removal.
