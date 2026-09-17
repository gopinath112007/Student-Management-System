import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Users, UserPlus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-icon">
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <span>EduManage</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/students"
            className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Students List</span>
          </Link>

          <Link to="/students/add" className="btn-primary-nav">
            <UserPlus size={18} />
            <span>Add Student</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
