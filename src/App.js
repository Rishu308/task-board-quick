// src/App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './styles.css'; // Import the CSS file for styling

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchData();
  }, []);

  return (
    <div>
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
};

export default App;
