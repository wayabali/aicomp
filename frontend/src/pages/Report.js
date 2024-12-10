import React, { useState } from 'react'; 
import '../styles/Reports.css'; 

function Reports() {

  const [report, setReport] = useState({
    busNumber: 'Bus 42', 
    stationName: 'Main Street Station', 
    reportDetails: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value, 
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report Submitted:', report); 
    alert('Report submitted successfully!');
  };

  return (
    <div className="reports-container">
      <h1>Bus Driver Report</h1> 
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label htmlFor="busNumber">Bus Number:</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={report.busNumber}
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationName">Station Name:</label>
          <input
            type="text"
            id="stationName"
            name="stationName"
            value={report.stationName}
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="reportDetails">Report Details:</label>
          <textarea
            id="reportDetails"
            name="reportDetails"
            value={report.reportDetails}
            onChange={handleInputChange} 
            placeholder="Enter the details of the report here..." 
          ></textarea>
        </div>
        <button type="submit">Submit Report</button> 
      </form>
    </div>
  );
}

export default Reports;
