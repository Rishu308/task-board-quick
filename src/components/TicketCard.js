import React from 'react';

// Helper function to truncate title if it exceeds 8 words
const truncateTitle = (title, wordLimit = 7) => {
  const words = title.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return title;
};

const TicketCard = ({ ticket, users, statusIcon, priorityIcon }) => {
  const user = users.find(user => user.id === ticket.userId);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '5px',
      margin: '5px',
      backgroundColor: '#f9f9f9',
      fontSize: '12px',
      width: '290px',
      height: '92px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
      }}>
        {/* Ticket ID at the top */}
        <h5 style={{ color: '#888', margin: '0 0 5px 0', padding: '0' }}>{ticket.id}</h5>

        {/* Task title with status icon */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {statusIcon && <img src={statusIcon} alt="Task Status" style={{ marginRight: '8px', width: '16px', height: '16px' }} />}
          <h4 style={{ fontSize: '14px', margin: '0 0 5px 0', padding: '0' }}>{truncateTitle(ticket.title)}</h4>
        </div>

        {/* Priority icon and feature request box */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          {priorityIcon && (
            <div style={{
              border: '1px solid #aaa',
              borderRadius: '5px',
              padding: '2px',
              marginRight: '8px',
            }}>
              <img src={priorityIcon} alt="Priority" style={{ width: '16px', height: '9px' }} />
            </div>
          )}
          {/* Feature request box */}
          <div style={{
            border: '0.2px solid #555',
            padding: '3px 8px',
            backgroundColor: 'white',
            borderRadius: '5px',
            fontSize: '10px',
            color: '#555',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
          }}>
            {ticket.tag.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
