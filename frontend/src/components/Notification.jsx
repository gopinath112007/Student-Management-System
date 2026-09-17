import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Notification({ notification, onClose }) {
  if (!notification || !notification.message) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        <span style={{ flex: 1 }}>{notification.message}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
