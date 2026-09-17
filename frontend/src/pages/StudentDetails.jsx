import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal';
import Notification from '../components/Notification';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, MapPin, Building2, User, Clock, ShieldCheck } from 'lucide-react';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch student details.');
      } finally {
        setLoading(false);
      }
    }
    loadStudent();
  }, [id]);

  const confirmDelete = async () => {
    if (!student) return;
    setIsDeleting(true);
    try {
      await api.deleteStudent(student.id);
      setNotification({
        type: 'success',
        message: `Student '${student.name}' deleted successfully.`
      });
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to delete student.'
      });
      setIsDeleting(false);
    }
  };

  const getYearLabel = (year) => {
    switch (parseInt(year, 10)) {
      case 1: return '1st Year (Freshman)';
      case 2: return '2nd Year (Sophomore)';
      case 3: return '3rd Year (Junior)';
      case 4: return '4th Year (Senior)';
      default: return `Year ${year}`;
    }
  };

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p>Loading student profile...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="card state-container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h3 style={{ color: 'var(--danger)' }}>Student Profile Error</h3>
        <p>{error || 'Student record not found.'}</p>
        <Link to="/students" className="btn btn-primary btn-sm">Return to Student Directory</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="page-header">
        <div>
          <Link to="/students" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <h1 className="page-title">Student Details Profile</h1>
          <p className="page-subtitle">Complete academic profile for {student.name}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to={`/students/edit/${student.id}`} className="btn btn-secondary">
            <Edit size={16} color="var(--primary)" />
            <span>Edit Profile</span>
          </Link>
          <button onClick={() => setDeleteModalOpen(true)} className="btn btn-danger">
            <Trash2 size={16} />
            <span>Delete Student</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {/* Banner Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 800
            }}>
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{student.name}</h2>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                Register No: {student.register_number}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-dept" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
              {student.department}
            </span>
            <span className="badge badge-year" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
              {getYearLabel(student.year)}
            </span>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {/* Email */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Email Address</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.email}</div>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#06b6d4', background: '#ecfeff', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Contact Phone</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.phone}</div>
            </div>
          </div>

          {/* Gender */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#8b5cf6', background: '#f3e8ff', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Gender</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.gender}</div>
            </div>
          </div>

          {/* Date of Birth */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#10b981', background: '#ecfdf5', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Calendar size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Date of Birth</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.date_of_birth}</div>
            </div>
          </div>

          {/* Department */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#f59e0b', background: '#fffbeb', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Department</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.department}</div>
            </div>
          </div>

          {/* Created Timestamp */}
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#64748b', background: '#f1f5f9', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Creation Timestamp</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {student.created_date ? new Date(student.created_date).toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '0.875rem' }}>
            <div style={{ color: '#ef4444', background: '#fef2f2', padding: '0.6rem', borderRadius: 'var(--radius-md)', alignSelf: 'flex-start' }}>
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Residential Address</div>
              <div style={{ fontWeight: 500, fontSize: '0.95rem', marginTop: '0.35rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {student.address || 'No residential address specified.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Student Record"
        message="Are you sure you want to delete this student from the database? This action is permanent."
        studentInfo={student}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
