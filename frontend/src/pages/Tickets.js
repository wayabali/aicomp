import React, { useState } from 'react'; // Import React and useState hook
import '../styles/BusStations.css'; // Import the CSS for styling

function Station() {
  const [stations] = useState([ // Static data for multiple bus stations
    {
      name: 'Main Street Station', // Name of the bus station
      address: '123 Main St', // Address of the bus station
      peopleWaiting: 15, // Number of people waiting
    },
    {
      name: 'Central Park Station',
      address: '456 Park Ave',
      peopleWaiting: 25,
    },
    {
      name: 'Downtown Station',
      address: '789 Broadway',
      peopleWaiting: 10,
    },
  ]);

  const [currentStation, setCurrentStation] = useState(stations[0]); // Set the current station (initially the first one)

  return (
    <div className="stations-container">
      <h1>Bus Stations</h1> {/* Heading for the page */}
      
      {/* Display the current bus station larger */}
      <div className="current-station">
        <h2>{currentStation.name}</h2> {/* Display the name of the current bus station */}
        <p>Address: {currentStation.address}</p> {/* Display the address */}
        <p>People Waiting: {currentStation.peopleWaiting}</p> {/* Display the number of people waiting */}
      </div>
      
      {/* List other stations */}
      <div className="stations-list">
        {stations.map((station, index) => (
          <div key={index} className="station-card" onClick={() => setCurrentStation(station)}>
            <h2>{station.name}</h2> {/* Display the name of the bus station */}
            <p>People Waiting: {station.peopleWaiting}</p> {/* Display the number of people waiting */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Station;