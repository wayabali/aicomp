import React, { useEffect, useState } from "react";
import NextButton from "../components/NextButton";
import PreceButton from "../components/PreceButton";
import "../styles/Ticket.css";

const Tickets = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [isAdmin, setIsAdmin] = useState(false); // Admin status state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const currentTicketUrl = "https://hackaton-33os.onrender.com/ticket/TicketAdmin/";
  const updateTicketUrl = "https://hackaton-33os.onrender.com/ticket/TicketAdmin/";

  useEffect(() => {
    // Fetch authentication and role status
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (authToken && userRole) {
      setIsAuthenticated(true);
      setIsAdmin(userRole === "admin");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
    setIsLoading(false); // Set loading to false after checking authentication

    // Fetch current ticket number
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
      .catch((error) => console.error("Error fetching current ticket:", error));
  }, []);

  const updateTicket = (direction) => {
    if (ticketNumber === null) return;

    const newTicketNumber = direction === "next" ? ticketNumber + 1 : ticketNumber - 1;

    if (newTicketNumber < 1) return;

    fetch(updateTicketUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
      .catch((error) => console.error("Error updating ticket:", error));
  };

  const handleNext = () => updateTicket("next");
  const handlePrevious = () => updateTicket("previous");

  // Show loading screen if still loading
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or custom message
  }

  // Show "Not Authorized" page if not authenticated
  if (!isAuthenticated) {
    return <div>You are not authenticated. Please log in.</div>;
  }

  return (
    <div>
      <div className="ticket-container">
        <h1>CURRENT TICKET</h1>
        <div className="number-container">
          <div className="number">
            <p>{ticketNumber !== null ? ticketNumber : "Loading..."}</p>
          </div>
        </div>
        <div className="informations">
          {ticketInfo ? (
            <>
              <p>Nom : {ticketInfo.name}</p>
              <p>Type de l'opération : {ticketInfo.operationType}</p>
              <p>Handicap : {ticketInfo.handicap ? "Oui" : "Non"}</p>
            </>
          ) : (
            <p>Loading information...</p>
          )}
        </div>

        {/* Show the buttons only if the user is an admin */}
        {isAdmin ? (
          <div>
            <PreceButton onClick={handlePrevious} />
            <NextButton onClick={handleNext} />
          </div>
        ) : (
          <div>
            <p>You are authenticated but do not have admin privileges to manage tickets.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
