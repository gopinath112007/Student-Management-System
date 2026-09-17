import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import StudentForm from '../components/StudentForm';
import Notification from '../components/Notification';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setNotification(null);
    try {
      await api.createStudent(formData);
      setNotification({
        type: 'success',
        message: `Student '${formData.name}' created successfully!`
      });
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (err) {
      let msg = err.message || 'Failed to create student.';
      if (err.errors) {
        const firstKey = Object.keys(err.errors)[0];
        if (firstKey) {
          const detailArr = err.errors[firstKey];
          msg = `${firstKey.toUpperCase()}: ${Array.isArray(detailArr) ? detailArr.join(' ') : detailArr}`;
        }
      }
      setNotification({
        type: 'error',
        message: msg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
        <div>
          <Link to="/students" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <UserPlus size={26} color="var(--primary)" />
            Add New Student
          </h1>
          <p className="page-subtitle">Fill in student details below. All fields marked with * are required.</p>
        </div>
      </div>

      <StudentForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/students')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
