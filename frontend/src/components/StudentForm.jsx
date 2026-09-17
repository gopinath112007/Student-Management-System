import React, { useState, useEffect } from 'react';
import { Save, X, AlertCircle } from 'lucide-react';

export default function StudentForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    register_number: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    year: 1,
    gender: 'Male',
    date_of_birth: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        register_number: initialData.register_number || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || 'Computer Science',
        year: initialData.year || 1,
        gender: initialData.gender || 'Male',
        date_of_birth: initialData.date_of_birth || '',
        address: initialData.address || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.register_number.trim()) {
      newErrors.register_number = 'Register number is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d+$/.test(cleaned)) {
        newErrors.phone = 'Phone number must contain only digits.';
      } else if (cleaned.length < 7 || cleaned.length > 15) {
        newErrors.phone = 'Phone number must be 7 to 15 digits long.';
      }
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required.';
    }

    const yearVal = parseInt(formData.year, 10);
    if (!yearVal || yearVal < 1 || yearVal > 4) {
      newErrors.year = 'Academic year must be between 1 and 4.';
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        year: parseInt(formData.year, 10)
      });
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {/* Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="input-control"
            placeholder="e.g. Arun Kumar"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="form-error-msg">{errors.name}</div>}
        </div>

        {/* Register Number */}
        <div className="form-group">
          <label className="form-label">
            Register Number <span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="register_number"
            className="input-control"
            placeholder="e.g. CS2026001"
            value={formData.register_number}
            onChange={handleChange}
          />
          {errors.register_number && (
            <div className="form-error-msg">{errors.register_number}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="input-control"
            placeholder="e.g. arun@college.edu"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="form-error-msg">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input-control"
            placeholder="e.g. 9876543210"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label className="form-label">
            Department <span className="required-star">*</span>
          </label>
          <select
            name="department"
            className="select-control"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>
          {errors.department && (
            <div className="form-error-msg">{errors.department}</div>
          )}
        </div>

        {/* Academic Year */}
        <div className="form-group">
          <label className="form-label">
            Academic Year <span className="required-star">*</span>
          </label>
          <select
            name="year"
            className="select-control"
            value={formData.year}
            onChange={handleChange}
          >
            <option value={1}>1st Year (Freshman)</option>
            <option value={2}>2nd Year (Sophomore)</option>
            <option value={3}>3rd Year (Junior)</option>
            <option value={4}>4th Year (Senior)</option>
          </select>
          {errors.year && <div className="form-error-msg">{errors.year}</div>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="select-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label className="form-label">
            Date of Birth <span className="required-star">*</span>
          </label>
          <input
            type="date"
            name="date_of_birth"
            className="input-control"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          {errors.date_of_birth && (
            <div className="form-error-msg">{errors.date_of_birth}</div>
          )}
        </div>

        {/* Address */}
        <div className="form-group full-width">
          <label className="form-label">Residential Address</label>
          <textarea
            name="address"
            className="input-control"
            rows="3"
            placeholder="Enter complete street address, city, state..."
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X size={18} />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          <Save size={18} />
          <span>{isSubmitting ? 'Saving Student...' : 'Save Student'}</span>
        </button>
      </div>
    </form>
  );
}
