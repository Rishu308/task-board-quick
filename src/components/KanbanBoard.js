import React, { useState } from 'react';
import TicketCard from './TicketCard';

// Import SVG icons
import OptionsIcon from './icons/Display.svg';
import DropdownIcon from './icons/down.svg';
import TodoIcon from './icons/To-do.svg';
import InProgressIcon from './icons/in-progress.svg';
import BacklogIcon from './icons/Backlog.svg';
import DoneIcon from './icons/Done.svg';
import CanceledIcon from './icons/Cancelled.svg';
import NoPriorityIcon from './icons/No-priority.svg';
import LowPriorityIcon from './icons/Img - Low Priority.svg';
import MediumPriorityIcon from './icons/Img - Medium Priority.svg';
import HighPriorityIcon from './icons/Img - High Priority.svg';
import UrgentIcon from './icons/SVG - Urgent Priority colour.svg';
import MenuIcon from './icons/3 dot menu.svg';  // Import three-dot menu icon
import AddIcon from './icons/add.svg';      // Import add icon
import usericon from './icons/usericon.png';

const KanbanBoard = ({ tickets, users }) => {
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define status and priority labels
  const statusGroups = ['To do', 'In progress', 'Backlog', 'Done', 'Canceled'];
  const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

  // Map titles to their respective icons
  const getIconForTitle = (title) => {
    if (users.some(user => user.name === title)) {
      return usericon; // Use Done icon for user titles
    }

    switch (title) {
      case 'To do':
        return TodoIcon;
      case 'In progress':
        return InProgressIcon;
      case 'Backlog':
        return BacklogIcon;
      case 'Done':
        return DoneIcon;
      case 'Canceled':
        return CanceledIcon;
      case 'No priority':
        return NoPriorityIcon;
      case 'Low':
        return LowPriorityIcon;
      case 'Medium':
        return MediumPriorityIcon;
      case 'High':
        return HighPriorityIcon;
      case 'Urgent':
        return UrgentIcon;
      default:
        return null;
    }
  };

  // Get status icon for the ticket
  const getStatusIcon = (status) => {
    switch (status) {
      case 'To do':
        return TodoIcon;
      case 'In progress':
        return InProgressIcon;
      case 'Backlog':
        return BacklogIcon;
      case 'Done':
        return DoneIcon;
      case 'Canceled':
        return CanceledIcon;
      default:
        return null;
    }
  };

  // Get priority icon for the ticket
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return NoPriorityIcon;
      case 1:
        return LowPriorityIcon;
      case 2:
        return MediumPriorityIcon;
      case 3:
        return HighPriorityIcon;
      case 4:
        return UrgentIcon;
      default:
        return null;
    }
  };

  // Group tickets based on the selected grouping method
  const groupTickets = (tickets) => {
    const grouped = {};

    if (groupBy === 'status') {
      statusGroups.forEach(status => {
        grouped[status] = [];
      });

      tickets.forEach(ticket => {
        if (grouped[ticket.status]) {
          grouped[ticket.status].push(ticket);
        }
      });
    } else if (groupBy === 'user') {
      tickets.forEach(ticket => {
        const user = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
        if (!grouped[user]) grouped[user] = []; // Initialize user group if not exists
        grouped[user].push(ticket);
      });
    } else if (groupBy === 'priority') {
      priorityLabels.forEach((label) => {
        grouped[label] = [];
      });

      tickets.forEach(ticket => {
        const priorityLabel = priorityLabels[ticket.priority];
        if (grouped[priorityLabel]) {
          grouped[priorityLabel].push(ticket);
        } else {
          console.warn(`Unknown priority: ${ticket.priority}`);
        }
      });
    }

    return grouped;
  };

  // Sort tickets based on the selected sorting method
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* White strip at the top */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '10px 20px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button
          onClick={() => setIsDropdownOpen(prev => !prev)}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            fontSize: '14px'
          }}
        >
          <img src={OptionsIcon} alt="Options" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Display
          <img src={DropdownIcon} alt="Dropdown" style={{ marginLeft: '2px', verticalAlign: 'middle' }} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 1,
            padding: '20px',
            width: '320px',
          }}>
            <div style={{ fontWeight: 'bold', color: '#949494', display: 'flex', justifyContent: 'space-between', padding: '14px', marginBottom: '2px' }}>
              <label htmlFor="grouping">Grouping</label>
              <select id="grouping" value={groupBy} onChange={(e) => setGroupBy(e.target.value)} style={{ fontWeight: 'bold' }}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div style={{ fontWeight: 'bold', color: '#949494', display: 'flex', justifyContent: 'space-between', padding: '14px', marginBottom: '2px' }}>
              <label htmlFor="sorting">Sorting</label>
              <select id="sorting" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ fontWeight: 'bold' }}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grouping tickets */}
      <div style={{ display: 'flex', overflowX: 'auto', flexGrow: 1 }}>
        {Object.entries(groupTickets(tickets)).map(([groupTitle, groupTickets]) => (
          <div key={groupTitle} style={{ margin: '10px', flexShrink: 0, width: '290px', padding: '10px', borderRadius: '4px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ textAlign: 'left', margin: 0 }}>
                <img src={getIconForTitle(groupTitle)} alt={groupTitle} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {groupTitle}
                {/* Display the number of tickets */}
                <span style={{ color: 'grey', fontWeight: 'normal', marginLeft: '8px' }}>
                  {groupTickets.length}
                </span>
              </h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={AddIcon} alt="Add" style={{ marginLeft: 'auto', marginRight: '4px', cursor: 'pointer' }} />
                <img src={MenuIcon} alt="Menu" style={{ cursor: 'pointer' }} />
              </div>
            </div>
            {sortTickets(groupTickets).map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                users={users}
                statusIcon={getStatusIcon(ticket.status)}
                priorityIcon={getPriorityIcon(ticket.priority)} // Pass priority icon
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
