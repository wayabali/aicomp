import React, { useState, useEffect } from 'react';
import '../styles/DashboardPage.css';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaLandmark } from "react-icons/fa6";
import { VscGraphLeft } from "react-icons/vsc";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [guichets, setGuichets] = useState([]);
  const [filteredGuichets, setFilteredGuichets] = useState([]);
  const [allGuichets, setAllGuichets] = useState([]);
  const [mostActiveHours, setMostActiveHours] = useState([]);
  const [mostActiveDays, setMostActiveDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching authentication status
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (authToken && userRole === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
    setIsLoading(false); // Set loading to false after checking authentication
  }, []);

  // Fetch data only if authenticated and an admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
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

      const fetchActiveTimes = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/guichet-active-times');
          const data = await response.json();
          setMostActiveHours(data.most_active_time || []);
          setMostActiveDays(data.most_active_days || []);
        } catch (error) {
          console.error('Error fetching active times:', error);
        }
      };

      fetchEmployees();
      fetchTopGuichets();
      fetchAllGuichets();
      fetchActiveTimes();
    }
  }, [isAuthenticated, isAdmin]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredEmployees(
      employees.filter((employee) =>
        `${employee.name || ''} ${employee.surname || ''}`.toLowerCase().includes(query)
      )
    );

    setFilteredGuichets(
      guichets.filter((guichet) => guichet.name.toLowerCase().includes(query))
    );
  };

  const handleShowAll = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const activeHoursChartData = {
    labels: mostActiveHours.map((item) => `${item.hour}:00`),
    datasets: [
      {
        label: 'Tickets',
        data: mostActiveHours.map((item) => item.ticket_count),
        backgroundColor: '#4e73df',
      },
    ],
  };

  const activeDaysChartData = {
    labels: mostActiveDays.map((item) => item.day),
    datasets: [
      {
        label: 'Tickets',
        data: mostActiveDays.map((item) => item.ticket_count),
        backgroundColor: '#1cc88a',
      },
    ],
  };

  const ChartSection = ({ title, data, options }) => (
    <section className="chart-section">
      <h2><VscGraphLeft /> {title}</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </section>
  );

  // Show loading screen if still loading
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or custom message
  }

  // Show "Not Authorized" page if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }

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
                <p>No employees found</p>
              ) : (
                filteredEmployees.map((employee) => (
                  <div key={employee.id}>
                    <p>{employee.name} {employee.surname}</p>
                    <p>{employee.birthDate}</p>
                    <p>{employee.status}</p>
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

          <ChartSection
            title="Most Active Hours"
            data={activeHoursChartData}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: 'Tickets by Hour' } },
              scales: {
                x: {
                  beginAtZero: true,
                  categoryPercentage: 0.8, // Controls space between bars (adjust to your preference)
                },
                y: { beginAtZero: true },
              },
              elements: {
                bar: {
                  barThickness: 30, // Adjust this value to control the width of the bars
                },
              },
            }}
          />

          <ChartSection
            title="Most Active Days"
            data={activeDaysChartData}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: 'Tickets by Day' } },
              scales: {
                x: {
                  beginAtZero: true,
                  categoryPercentage: 0.8, // Controls space between bars (adjust to your preference)
                },
                y: { beginAtZero: true },
              },
              elements: {
                bar: {
                  barThickness: 30, // Adjust this value to control the width of the bars
                },
              },
            }}
          />
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
