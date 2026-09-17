import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import StudentForm from '../components/StudentForm';
import Notification from '../components/Notification';
import { ArrowLeft, Edit } from 'lucide-react';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      try {
        const data = await api.getStudentById(id);
        setStudent(data);
      } catch (err) {
        setNotification({
          type: 'error',
          message: err.message || 'Failed to load student details.'
        });
      } finally {
        setLoading(false);
      }
    }
    loadStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setNotification(null);
    try {
      await api.updateStudent(id, formData);
      setNotification({
        type: 'success',
        message: `Student '${formData.name}' updated successfully!`
      });
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (err) {
      let msg = err.message || 'Failed to update student.';
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

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p>Loading student information...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="card state-container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h3>Student Record Not Found</h3>
        <p>No student with ID #{id} exists in the system.</p>
        <Link to="/students" className="btn btn-primary btn-sm">Return to Student Directory</Link>
      </div>
    );
  }

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
            <Edit size={26} color="var(--primary)" />
            Edit Student Profile: {student.name}
          </h1>
          <p className="page-subtitle">Update register number, department, contact info, or address.</p>
        </div>
      </div>

      <StudentForm
        initialData={student}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/students')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
