import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function StudentTable({ students, onView, onEdit, onDelete }) {
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
    <div className="table-container">
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Reg Number</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <strong style={{ color: 'var(--primary)' }}>{student.register_number}</strong>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{student.name}</span>
                </td>
                <td>
                  <span className="badge badge-dept">{student.department}</span>
                </td>
                <td>
                  <span className="badge badge-year">{getYearLabel(student.year)}</span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{student.email}</td>
                <td style={{ color: 'var(--text-muted)' }}>{student.phone}</td>
                <td>
                  <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onView(student)}
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onEdit(student)}
                      title="Edit Student"
                    >
                      <Edit size={15} color="var(--primary)" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onDelete(student)}
                      title="Delete Student"
                    >
                      <Trash2 size={15} color="var(--danger)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
