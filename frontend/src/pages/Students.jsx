import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import StudentTable from '../components/StudentTable';
import StudentCard from '../components/StudentCard';
import ConfirmationModal from '../components/ConfirmationModal';
import Notification from '../components/Notification';
import { UserPlus, Table, LayoutGrid, Users } from 'lucide-react';

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter State
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  // View toggle: 'table' | 'cards'
  const [viewMode, setViewMode] = useState('table');

  // Deletion state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification state
  const [notification, setNotification] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getStudents({ search, department, year });
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student data from API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly for optimal UX
    const timer = setTimeout(() => {
      fetchStudents();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, department, year]);

  const handleClearFilters = () => {
    setSearch('');
    setDepartment('');
    setYear('');
  };

  // Handlers for record actions
  const handleView = (student) => {
    navigate(`/students/details/${student.id}`);
  };

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`);
  };

  const promptDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteStudent(studentToDelete.id);
      setNotification({
        type: 'success',
        message: `Student '${studentToDelete.name}' successfully deleted!`
      });
      setDeleteModalOpen(false);
      setStudentToDelete(null);
      fetchStudents();
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to delete student record.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Extract unique departments for dropdown
  const allDepartments = Array.from(new Set(students.map(s => s.department).filter(Boolean)));
  if (!allDepartments.includes('Computer Science')) allDepartments.push('Computer Science');
  if (!allDepartments.includes('Information Technology')) allDepartments.push('Information Technology');
  if (!allDepartments.includes('Electronics & Communication')) allDepartments.push('Electronics & Communication');

  return (
    <div>
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Student Records Directory</h1>
          <p className="page-subtitle">Manage, search, edit, and delete student details across all departments.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* View mode toggle */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.2rem', display: 'flex' }}>
            <button
              onClick={() => setViewMode('table')}
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-clear'}`}
              title="Table View"
            >
              <Table size={16} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-clear'}`}
              title="Grid Cards View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <Link to="/students/add" className="btn btn-primary">
            <UserPlus size={18} />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Search & Filter Controls */}
      <SearchFilter
        search={search}
        department={department}
        year={year}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onYearChange={setYear}
        onClearFilters={handleClearFilters}
        departments={allDepartments}
      />

      {/* Content Rendering */}
      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Fetching student list...</p>
        </div>
      ) : error ? (
        <div className="card" style={{ borderColor: 'var(--danger)', backgroundColor: 'var(--danger-bg)' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Error Loading Students</h3>
          <p>{error}</p>
        </div>
      ) : students.length === 0 ? (
        <div className="card state-container">
          <Users className="state-icon" />
          <h3>No Student Records Found</h3>
          <p style={{ maxWidth: '400px' }}>
            No students match your active search filter "{search || department || year}". Try clearing filters or adding a new student.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button onClick={handleClearFilters} className="btn btn-secondary btn-sm">Clear Filters</button>
            <Link to="/students/add" className="btn btn-primary btn-sm">Add New Student</Link>
          </div>
        </div>
      ) : viewMode === 'table' ? (
        <StudentTable
          students={students}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={promptDelete}
        />
      ) : (
        <div className="cards-grid">
          {students.map((st) => (
            <StudentCard
              key={st.id}
              student={st}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={promptDelete}
            />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Student Record"
        message="Are you sure you want to delete this student from the database? This action is permanent."
        studentInfo={studentToDelete}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        isDeleting={isDeleting}
      />
    </div>
  );
}
