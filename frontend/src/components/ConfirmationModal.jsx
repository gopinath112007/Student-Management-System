import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmationModal({ isOpen, title, message, studentInfo, onConfirm, onCancel, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon-danger">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="modal-title">{title || 'Confirm Deletion'}</h3>
          </div>
        </div>

        <div className="modal-body">
          <p>{message || 'Are you sure you want to delete this student record? This action cannot be undone.'}</p>
          {studentInfo && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}>
              {studentInfo.name} <span style={{ color: 'var(--primary)', fontWeight: 700 }}>({studentInfo.register_number})</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Record'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
