// REST API Service for Student Management System
const API_BASE_URL = '/api';

/**
 * Helper to handle fetch responses and handle JSON/errors
 */
async function handleResponse(response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg = data?.message || data?.detail || `HTTP Error ${response.status}`;
    const errors = data?.errors || null;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.errors = errors;
    throw error;
  }

  return data;
}

export const api = {
  /**
   * Fetch all students with optional filters
   */
  async getStudents(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    if (filters.year) params.append('year', filters.year);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/students/${queryString}`);
    return handleResponse(response);
  },

  /**
   * Fetch single student by ID
   */
  async getStudentById(id) {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`);
    const result = await handleResponse(response);
    return result.data || result;
  },

  /**
   * Create a new student record
   */
  async createStudent(studentData) {
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing student record (PUT)
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  /**
   * Delete a student record (DELETE)
   */
  async deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }
};
