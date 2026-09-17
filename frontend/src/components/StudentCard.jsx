import React from 'react';
import { Mail, Phone, Calendar, MapPin, Eye, Edit, Trash2 } from 'lucide-react';

export default function StudentCard({ student, onView, onEdit, onDelete }) {
  const getYearLabel = (year) => {
    switch (parseInt(year, 10)) {
      case 1: return '1st Year';
      case 2: return '2nd Year';
      case 3: return '3rd Year';
      case 4: return '4th Year';
      default: return `Year ${year}`;
    }
  };

  return (
    <div className="student-card">
      <div className="student-card-header">
        <div>
          <div className="student-card-name">{student.name}</div>
          <div className="student-card-reg">{student.register_number}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-end' }}>
          <span className="badge badge-dept">{student.department}</span>
          <span className="badge badge-year">{getYearLabel(student.year)}</span>
        </div>
      </div>

      <div className="student-card-body">
        <div className="student-detail-item">
          <Mail size={16} />
          <span>{student.email}</span>
        </div>
        <div className="student-detail-item">
          <Phone size={16} />
          <span>{student.phone}</span>
        </div>
        {student.date_of_birth && (
          <div className="student-detail-item">
            <Calendar size={16} />
            <span>DOB: {student.date_of_birth}</span>
          </div>
        )}
        {student.address && (
          <div className="student-detail-item">
            <MapPin size={16} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {student.address}
            </span>
          </div>
        )}
      </div>

      <div className="actions-cell" style={{ justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onView(student)}
        >
          <Eye size={15} />
          <span>View</span>
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(student)}
        >
          <Edit size={15} color="var(--primary)" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onDelete(student)}
        >
          <Trash2 size={15} color="var(--danger)" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
