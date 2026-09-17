import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

export default function SearchFilter({ search, department, year, onSearchChange, onDepartmentChange, onYearChange, onClearFilters, departments = [] }) {
  return (
    <div className="search-filter-card">
      <div className="search-filter-grid">
        {/* Dynamic Search Input */}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="input-control"
            placeholder="Search by student name or register number..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Department Filter */}
        <div>
          <select
            className="select-control"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Year Filter */}
        <div>
          <select
            className="select-control"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div>
          <button
            type="button"
            className="btn btn-clear btn-sm"
            onClick={onClearFilters}
            title="Reset Search and Filters"
          >
            <RotateCcw size={15} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
