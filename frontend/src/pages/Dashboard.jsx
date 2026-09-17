import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Users, Building2, Calendar, UserPlus, Eye, ArrowRight, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute summary metrics
  const totalStudents = students.length;
  
  const departments = Array.from(new Set(students.map(s => s.department).filter(Boolean)));
  const totalDepartments = departments.length;

  const yearCounts = {
    1: students.filter(s => parseInt(s.year, 10) === 1).length,
    2: students.filter(s => parseInt(s.year, 10) === 2).length,
    3: students.filter(s => parseInt(s.year, 10) === 3).length,
    4: students.filter(s => parseInt(s.year, 10) === 4).length,
  };

  // Recently added (top 5)
  const recentStudents = [...students].slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">Overview of student enrollment, academic departments, and quick stats.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchDashboardData} className="btn btn-secondary btn-sm" title="Refresh Dashboard">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <Link to="/students/add" className="btn btn-primary">
            <UserPlus size={18} />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      ) : error ? (
        <div className="card" style={{ borderColor: 'var(--danger)', backgroundColor: 'var(--danger-bg)' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Backend Connection Warning</h3>
          <p style={{ color: 'var(--text-main)' }}>{error}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Ensure Django REST API server is running at <code>http://127.0.0.1:8000/api/students/</code>
          </p>
        </div>
      ) : (
        <>
          {/* Key Metrics Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#eef2ff', color: '#4f46e5' }}>
                <Users size={24} />
              </div>
              <div className="stat-info">
                <h4>Total Students</h4>
                <div className="stat-value">{totalStudents}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <Building2 size={24} />
              </div>
              <div className="stat-info">
                <h4>Departments</h4>
                <div className="stat-value">{totalDepartments}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#f3e8ff', color: '#8b5cf6' }}>
                <Calendar size={24} />
              </div>
              <div className="stat-info">
                <h4>Senior (4th Year)</h4>
                <div className="stat-value">{yearCounts[4]}</div>
              </div>
            </div>
          </div>

          {/* Academic Year Breakdown & Recent Students */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Year Breakdown */}
            <div className="card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Students by Year</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { year: '1st Year (Freshman)', count: yearCounts[1], color: '#4f46e5' },
                  { year: '2nd Year (Sophomore)', count: yearCounts[2], color: '#06b6d4' },
                  { year: '3rd Year (Junior)', count: yearCounts[3], color: '#8b5cf6' },
                  { year: '4th Year (Senior)', count: yearCounts[4], color: '#10b981' },
                ].map((item, idx) => {
                  const percentage = totalStudents > 0 ? Math.round((item.count / totalStudents) * 100) : 0;
                  return (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        <span>{item.year}</span>
                        <span>{item.count} ({percentage}%)</span>
                      </div>
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: '100%',
                            background: item.color,
                            borderRadius: '4px',
                            transition: 'width 0.5s ease-out'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recently Added Students */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Recently Added Students</h3>
                <Link to="/students" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              {recentStudents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No student records found. Add your first student!
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th style={{ textAlign: 'right' }}>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((st) => (
                        <tr key={st.id}>
                          <td><strong style={{ color: 'var(--primary)' }}>{st.register_number}</strong></td>
                          <td style={{ fontWeight: 600 }}>{st.name}</td>
                          <td><span className="badge badge-dept">{st.department}</span></td>
                          <td><span className="badge badge-year">Year {st.year}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <Link to={`/students/details/${st.id}`} className="btn btn-secondary btn-sm">
                              <Eye size={14} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
