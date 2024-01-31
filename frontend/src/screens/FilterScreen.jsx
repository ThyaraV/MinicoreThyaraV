import React, { useState } from 'react';
import { useGetGradesQuery } from '../slices/gradesApiSlice.js';
import '../assets/styles/index.css';

const FilterScreen = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data: grades } = useGetGradesQuery();

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getFilteredGradesCount = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return grades.filter(grade => {
      const gradeDate = new Date(grade.startDate);
      return gradeDate >= start && gradeDate <= end;
    }).length;
  };


  return (
    <div className="filterScreen">
      <h1>Filter Grades by Date</h1>
      <div className="filterForm">
        <label htmlFor="start-date">Start Date:</label>
        <input 
          className="input"
          type="date" 
          id="start-date" 
          value={startDate} 
          onChange={handleStartDateChange} 
        />
        <label htmlFor="end-date">End Date:</label>
        <input 
          className="input"
          type="date" 
          id="end-date" 
          value={endDate} 
          onChange={handleEndDateChange} 
        />
        <button className="button" onClick={getFilteredGradesCount}>
          Show Grades Count
        </button>
      </div>
      {startDate && endDate && (
        <div>
          <p>Number of grades between {startDate} and {endDate}: {getFilteredGradesCount()}</p>
        </div>
      )}
    </div>
  );
};

export default FilterScreen;


