import React, { useState, useEffect } from 'react';
import '../styles/DashboardPage.css';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaLandmark } from "react-icons/fa6";
import { MdOutlineTimeline } from "react-icons/md";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [guichets, setGuichets] = useState([]);
  const [filteredGuichets, setFilteredGuichets] = useState([]);
  const [allGuichets, setAllGuichets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTimeData, setActiveTimeData] = useState({
    labels: [],
    datasets: [{
      label: 'Tickets per Hour',
      data: [],
      backgroundColor: '#4e73df',
      borderColor: '#4e73df',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize with all employees
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchTopGuichets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/most-active-guichet?limit=3');
        const data = await response.json();
        setGuichets(data);
        setFilteredGuichets(data); // Initialize with top 3 guichets
      } catch (error) {
        console.error('Error fetching guichet data:', error);
      }
    };

    const fetchAllGuichets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/most-active-guichet');
        const data = await response.json();
        setAllGuichets(data);
      } catch (error) {
        console.error('Error fetching all guichets:', error);
      }
    };

    // Fetch active time data (for bar chart)
    const fetchActiveTimeData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/guichet-active-times');
        const data = await response.json();
        const labels = data.map(item => item.timeOfDay);
        const ticketCounts = data.map(item => item.ticketCount);
        setActiveTimeData({
          labels: labels,
          datasets: [{
            label: 'Tickets per Hour',
            data: ticketCounts,
            backgroundColor: '#4e73df',
            borderColor: '#4e73df',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching active time data:', error);
      }
    };

    fetchEmployees();
    fetchTopGuichets();
    fetchAllGuichets();
    fetchActiveTimeData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees
    const filteredEmp = employees.filter((employee) =>
      `${employee.name} ${employee.surname}`.toLowerCase().includes(query)
    );
    setFilteredEmployees(filteredEmp);

    // Filter guichets
    const filteredGch = guichets.filter((guichet) =>
      guichet.name.toLowerCase().includes(query)
    );
    setFilteredGuichets(filteredGch);
  };

  const handleShowAll = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="dashboard-main">
        <div className="left-column">
          <section className="employees-section">
            <h2><BsFillPersonLinesFill /> Employees</h2>
            <div className="employee-list">
              {filteredEmployees.length === 0 ? (
                <p>No matching employees found.</p>
              ) : (
                filteredEmployees.map((employee) => (
                  <div key={employee.id} className="employee-card">
                    <p>Name: {employee.name} {employee.surname}</p>
                    <p>Birth Date: {new Date(employee.birthDate).toLocaleDateString()}</p>
                    <p>Status: {employee.status}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="right-column">
          <section className="most-active-guichet">
            <h2><FaLandmark /> Most Active Guichet</h2>
            {filteredGuichets.length === 0 ? (
              <p>No matching guichets found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Tickets</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuichets.map((guichet, index) => (
                    <tr key={index}>
                      <td>{guichet.name}</td>
                      <td>{guichet.tickets}</td>
                      <td>{guichet.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="show-all-button" onClick={handleShowAll}>Show All</button>
          </section>

          <section className="most-active-time">
            <h2><MdOutlineTimeline /> Most Active Time</h2>
            <div className="chart-container">
              <Bar data={activeTimeData} options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Most Active Time for Tickets',
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }} />
            </div>
          </section>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>All Guichets</h3>
            <ul>
              {allGuichets.map((guichet, index) => (
                <li key={index}>
                  <FaLandmark /> {guichet.name} - {guichet.ticketCount} Tickets
                </li>
              ))}
            </ul>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
