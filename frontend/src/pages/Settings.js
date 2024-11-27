import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import { FaLandmark } from "react-icons/fa6";
import { VscArchive } from "react-icons/vsc";

const Settings = () => {
  const [guichets, setGuichets] = useState([]);
  const [distributeurStatus, setDistributeurStatus] = useState(false); // Track distributeur status
  const [showPopup, setShowPopup] = useState(false); // Toggle popup visibility
  const [newGuichet, setNewGuichet] = useState({ name: "", status: "open" }); // Form state for new guichet
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [isAdmin, setIsAdmin] = useState(false); // Admin status state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch authentication status and user role on component load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Assuming your API returns the user's authentication status and role
        const response = await fetch("http://localhost:3001/api/auth/status", {
          credentials: "include", // Include cookies or other credentials if necessary
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
          setIsAdmin(data.role === "admin"); // Assuming role comes as 'admin' or 'user'
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false); // Once the auth check is done, stop the loading
      }
    };

    checkAuthentication();
  }, []);

  // Handle checkbox toggle
  const handleDistributeurToggle = async () => {
    const newStatus = !distributeurStatus;
    try {
      const response = await fetch("http://localhost:3001/api/distributeur", {
        method: "POST", // Use PUT or PATCH if preferred
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setDistributeurStatus(newStatus); // Update state on success
      } else {
        console.error("Failed to update distributeur status");
      }
    } catch (error) {
      console.error("Error toggling distributeur status:", error);
    }
  };

  // Handle opening and closing the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handle adding a new guichet
  const handleAddGuichet = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/guichets_settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuichet),
      });
  
      if (response.ok) {
        const addedGuichet = await response.json();
        setGuichets([...guichets, addedGuichet]); // Add new guichet to state
        setShowPopup(false); // Close popup
        setNewGuichet({ name: "", status: "open" }); // Reset form
      } else {
        console.error("Failed to add new guichet");
      }
    } catch (error) {
      console.error("Error adding guichet:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter guichets based on the search query
  const filteredGuichets = guichets.filter((guichet) =>
    guichet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading screen if still loading
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or custom message
  }

  // Show "Not Authorized" page if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <div>You are not authorized to access this page.</div>;
  }

  return (
    <div className="Settings-container">
      <div className="search_setting_container">
        <input
          className="search-input"
          placeholder="Search Guichet"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="gere-guichet-container">
        <h2>
          <FaLandmark /> Guichet
        </h2>
        <button className="btn-gere-guichet" onClick={togglePopup}>
          Gérer Guichet
        </button>
      </div>

      <div className="distributeur-container">
        <h2>
          <VscArchive /> Distributeur
        </h2>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={distributeurStatus}
            onChange={handleDistributeurToggle}
          />
          <span>Distributeur {distributeurStatus ? "Enabled" : "Disabled"}</span>
        </label>
      </div>

      {/* Render filtered guichets */}
      <div className="guichet-status-container">
        {filteredGuichets.map((guichet) => (
          <div key={guichet.id} className="card-guichet">
            <div className="num-container">
              <h2>Num</h2>
              <p>{guichet.name}</p>
            </div>
            <div className="status-container">
              <h2>Status</h2>
              <div
                className="status-indicator"
                style={{
                  backgroundColor: guichet.status === "open" ? "green" : "red",
                  border: `2px solid ${
                    guichet.status === "open" ? "green" : "red"
                  }`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup for adding a new guichet */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>Ajouter un Guichet</h2>
            <label>
              Nom:
              <input
                type="text"
                value={newGuichet.name}
                onChange={(e) =>
                  setNewGuichet({ ...newGuichet, name: e.target.value })
                }
              />
            </label>
            <label>
              Status:
              <select
                value={newGuichet.status}
                onChange={(e) =>
                  setNewGuichet({ ...newGuichet, status: e.target.value })
                }
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </label>
            <div className="popup-actions">
              <button onClick={handleAddGuichet}>Ajouter</button>
              <button onClick={togglePopup}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
