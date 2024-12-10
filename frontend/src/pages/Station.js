import React, { useState } from 'react'; 
import '../styles/Station.css'; 
import BusDetails from '../components/BusDetails';

function Station() {
  const [stations] = useState([
    {
      name: 'Main Street Station', 
      address: '123 Main St', 
      peopleWaiting: 15, 
      max_places : 8 
    },
    {
      name: 'Central Park Station',
      address: '456 Park Ave',
      peopleWaiting: 25,
      max_places : 16
    },
    {
      name: 'Downtown Station',
      address: '789 Broadway',
      peopleWaiting: 10,
      max_places : 4
    },
  ]);

  const [currentStation, setCurrentStation] = useState(stations[0]); 

  return (
    <div className="stations-container">
      <h1>Bus Stations</h1> 
      
      <div className="current-station">
        <h2>{currentStation.name}</h2> 
        <p>Address: {currentStation.address}</p> 
        <p>People Waiting: {currentStation.peopleWaiting}</p> 
      </div>
      <BusDetails/>
      
      <div className="stations-list">
        {stations.map((station, index) => (
          <div key={index} className="station-card" onClick={() => setCurrentStation(station)}>
            <h2>{station.name}</h2> 
            <p>People Waiting: {station.peopleWaiting}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Station;