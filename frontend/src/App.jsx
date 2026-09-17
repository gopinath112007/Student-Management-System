import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/students/details/:id" element={<StudentDetails />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p>© 2026 Student Management System | Built following Full Stack Web App SOP (React • Django REST Framework • SQLite)</p>
        </div>
      </footer>
    </div>
  );
}
