import React, { useEffect, useState } from 'react';
import NextButton from '../components/NextButton';
import PreceButton from '../components/PreceButton';
import '../styles/Ticket.css';

const Tickets = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);

  const currentTicketUrl = ' https://hackaton-33os.onrender.com/ticket/TicketAdmin/';
  const updateTicketUrl = ' https://hackaton-33os.onrender.com/ticket/TicketAdmin/';

  useEffect(() => {
    fetch(currentTicketUrl)
      .then((response) => response.json())
      .then((data) => {
        setTicketNumber(data.nmr); 
        setTicketInfo({
          name: data.name,
          operationType: data.ticket_type,
          handicap: data.handicap,
        });
      })
      .catch((error) => console.error('Error fetching current ticket:', error));
  }, []);

  const updateTicket = (direction) => {
    if (ticketNumber === null) return;

    const newTicketNumber = direction === 'next' ? ticketNumber + 1 : ticketNumber - 1;

    if (newTicketNumber < 1) return;

    fetch(updateTicketUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: newTicketNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTicketNumber(data.nmr);
        setTicketInfo({
          name: data.name,
          operationType: data.ticket_type,
          handicap: data.handicap,
        });
      })
      .catch((error) => console.error('Error updating ticket:', error));
  };

  const handleNext = () => updateTicket('next');
  const handlePrevious = () => updateTicket('previous');

  return (
    <div>
      <div className="ticket-container">
        <h1>CURRENT TICKET</h1>
        <div className="number-container">
          <div className="number">
            <p>{ticketNumber !== null ? ticketNumber : 'Loading...'}</p>
          </div>
        </div>
        <div className="informations">
          {ticketInfo ? (
            <>
              <p>Nom : {ticketInfo.name}</p>
              <p>Type de l'opération : {ticketInfo.operationType}</p>
              <p>Handicap : {ticketInfo.handicap ? 'Oui' : 'Non'}</p>
            </>
          ) : (
            <p>Loading information...</p>
          )}
        </div>
        <div>
          <PreceButton onClick={handlePrevious} />
          <NextButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
