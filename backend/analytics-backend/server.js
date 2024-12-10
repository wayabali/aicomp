const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Données statiques
const employees = [
  { id: 1, name: 'mohammed', surname: 'kazi', birthDate: '1990-05-12', status: 'Active' },
  { id: 2, name: 'nourddine', surname: 'bouzini', birthDate: '1985-08-23', status: 'Inactive' },
  { id: 3, name: 'khiro', surname: 'midoune', birthDate: '1992-12-14', status: 'Active' },
];

const buses = [
  { id: 1, name: 'Bus A', chauffeur: 'mohammed kazi' },
  { id: 2, name: 'Bus B', chauffeur: 'khiro midoune' },
  { id: 3, name: 'Bus C', chauffeur: 'nourddine bouzini' },
];

const busActivities = [
  { bus_id: 1, hour: 8, day: 'Monday', ticket_count_await: 25, ticket_count_await: 25 },
  { bus_id: 1, hour: 9, day: 'Monday', ticket_count: 30, ticket_count_await: 25 },
  { bus_id: 2, hour: 14, day: 'Tuesday', ticket_count: 45 , ticket_count_await: 25},
  { bus_id: 2, hour: 15, day: 'Tuesday', ticket_count: 50 , ticket_count_await: 25},
  { bus_id: 3, hour: 16, day: 'Wednesday', ticket_count: 60 , ticket_count_await: 25},
  { bus_id: 3, hour: 17, day: 'Wednesday', ticket_count: 70 , ticket_count_await: 25},
  { bus_id: 1, hour: 8, day: 'Thursday', ticket_count: 20 , ticket_count_await: 25},
  { bus_id: 2, hour: 9, day: 'Thursday', ticket_count: 35 , ticket_count_await: 25},
];


 

app.get('/employees', async (req, res) => {
    try {
      const [rows] = await promisePool.query('SELECT id, name, surname, birthDate, status FROM employees');
      res.json(rows);  // Retourne les employés sous forme de JSON
    } catch (error) {
      console.error('Error fetching employee data:', error);
      res.status(500).send('Error fetching employee data');
    }
  });
  
  


app.get('/most-active-Bus', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    try {
      // Récupérer les données des bus
      const [buses] = await promisePool.query('SELECT id, name, chauffeur FROM buses');
      
      // Récupérer les activités des bus
      const [busActivities] = await promisePool.query('SELECT bus_id, hour, day, ticket_count FROM bus_activities');
  
      const busTicketCounts = buses.map((bus) => {
        const totalTickets = busActivities
          .filter((activity) => activity.bus_id === bus.id)
          .reduce((sum, activity) => sum + activity.ticket_count, 0);
        return { name: bus.name, chauffeur: bus.chauffeur, etudiantCount: totalTickets };
      });
  
      const sortedBuses = busTicketCounts
        .sort((a, b) => b.etudiantCount - a.etudiantCount)
        .slice(0, limit);
  
      res.json(sortedBuses);
    } catch (error) {
      console.error('Error fetching bus data:', error);
      res.status(500).send('Error fetching bus data');
    }
  });
  

app.get('/Bus-active-times', async (req, res) => {
    try {
   
      const [busActivities] = await promisePool.query('SELECT bus_id, hour, day, ticket_count FROM bus_activities');
      
      const mostActiveTime = Array.from(
        busActivities.reduce((map, activity) => {
          map.set(activity.hour, (map.get(activity.hour) || 0) + activity.ticket_count);
          return map;
        }, new Map())
      ).map(([hour, ticket_count]) => ({ hour, ticket_count }));
  
      const mostActiveDays = Array.from(
        busActivities.reduce((map, activity) => {
          map.set(activity.day, (map.get(activity.day) || 0) + activity.ticket_count);
          return map;
        }, new Map())
      ).map(([day, ticket_count]) => ({ day, ticket_count }));
  
      res.json({
        most_active_time: mostActiveTime.sort((a, b) => a.hour - b.hour),
        most_active_days: mostActiveDays.sort((a, b) => a.day.localeCompare(b.day)),
      });
    } catch (error) {
      console.error('Error fetching bus active times:', error);
      res.status(500).send('Error fetching bus active times');
    }
  });
  


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
