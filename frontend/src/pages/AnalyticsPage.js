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
  const [Buss, setBuss] = useState([]);
  const [filteredBuss, setFilteredBuss] = useState([]);
  const [allBus, setallBus] = useState([]);
  const [mostActiveHours, setMostActiveHours] = useState([]);
  const [mostActiveDays, setMostActiveDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

/*  // Authentication State
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
*/
  // Fetch data only if authenticated and an admin
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/employees');
        
        // Afficher la réponse brute
        const text = await response.text(); 
        console.log('Raw response:', text);  // Log la réponse brute dans la console
    
        // Vérifier si la réponse est un JSON valide
        const data = JSON.parse(text);
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    
    
  
    const fetchTopBuss = async () => {
      try {
        const response = await fetch('http://localhost:3001/most-active-Bus?limit=3');
        const text = await response.text();
        console.log('Raw Bus response:', text);
        const data = JSON.parse(text);
        setBuss(data);
        setFilteredBuss(data);
      } catch (error) {
        console.error('Error fetching Bus data:', error);
      }
    };
    
    // Répétez cette opération pour fetchAllBus et fetchActiveTimes
    
    const fetchAllBus = async () => {
      try {
        const response = await fetch('http://localhost:3001/most-active-Bus');
        const data = await response.json();
        setallBus(data);
      } catch (error) {
        console.error('Error fetching all Buss:', error);
      }
    };
  
    const fetchActiveTimes = async () => {
      try {
        const response = await fetch('http://localhost:3001/Bus-active-times');
        const data = await response.json();
        setMostActiveHours(data.most_active_time || []);
        setMostActiveDays(data.most_active_days || []);
      } catch (error) {
        console.error('Error fetching active times:', error);
      }
    };
  
    fetchEmployees();
    fetchTopBuss();
    fetchAllBus();
    fetchActiveTimes();
  }, []);
  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredEmployees(
      employees.filter((employee) =>
        `${employee.name || ''} ${employee.surname || ''}`.toLowerCase().includes(query)
      )
    );

    setFilteredBuss(
      Buss.filter((Bus) => Bus.name.toLowerCase().includes(query))
    );
  };

  const handleShowAll = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const ActiveStationChartData = {
    labels: mostActiveHours.map((item) => `${item.hour}:00`),
    datasets: [
      {
        label: 'Students',
        data: mostActiveHours.map((item) => item.ticket_count),
        backgroundColor: '#4e73df',
      },
    ],
  };

  const Station_awaitedChartData = {
    labels: mostActiveDays.map((item) => item.day),
    datasets: [
      {
        label: 'students',
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
          <section className="active-bus">
            <h2><FaLandmark />  Bus Active</h2>
            {filteredBuss.length === 0 ? (
              <p>No matching Bus found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Chauffeur</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {filteredBuss.map((bus, index) => (
                    <tr key={index}>
                      <td>{bus.name}</td>
                      <td>{bus.chauffeur}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="show-all-button" onClick={handleShowAll}>Show All</button>
          </section>
          

          <ChartSection
            title="Most Active Station"
            data={ActiveStationChartData}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: 'Students by hours' } },
              scales: {
                x: {
                  beginAtZero: true,
                  categoryPercentage: 0.8, // Controls space between bars (adjust to your preference)
                },
                y: { beginAtZero: true },
              },
              elements: {
                bar: {
                  barThickness: 20, // Adjust this value to control the width of the bars
                },
              },
            }}
          />

          <ChartSection
            title="Most Station awaited "
            data={Station_awaitedChartData}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: ' awaited student by hours' } },
              scales: {
                x: {
                  beginAtZero: true,
                  categoryPercentage: 0.8, // Controls space between bars (adjust to your preference)
                },
                y: { beginAtZero: true },
              },
              elements: {
                bar: {
                  barThickness: 10, // Adjust this value to control the width of the bars
                },
              },
            }}
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>All Bus</h3>
            <ul>
              {allBus.map((Bus, index) => (
                <li key={index}>
                  <FaLandmark /> {Bus.name} - {Bus.etudiantCount} Tickets
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
