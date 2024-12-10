import React, { useState } from 'react'; // Import React and useState hook
import '../styles/Reports.css'; // Import the CSS for styling

function Reports() {
  // Static data for the report
  const [report] = useState({
    busNumber: 'Bus 42', // Example bus number
    stationName: 'Main Street Station', // Example station name
    reportDetails: 'Minor delay due to traffic congestion.', // Example report details
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report Submitted:', report); // Log the report data (this would later be sent to a server)
    alert('Report submitted successfully!');
  };

  return (
    <div className="reports-container">
      <h1>Bus Driver Report</h1> {/* Heading for the page */}
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label htmlFor="busNumber">Bus Number:</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={report.busNumber}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationName">Station Name:</label>
          <input
            type="text"
            id="stationName"
            name="stationName"
            value={report.stationName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="reportDetails">Report Details:</label>
          <textarea
            id="reportDetails"
            name="reportDetails"
            value={report.reportDetails}
            readOnly
          ></textarea>
        </div>
        <button type="submit">Submit Report</button> {/* Button to submit the report */}
      </form>
    </div>
  );
}

export default Reports;