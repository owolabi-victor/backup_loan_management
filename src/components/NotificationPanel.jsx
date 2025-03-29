import React from 'react';

function NotificationPanel({ closeNotificationPanel }) {
  const notifications = [
    {
      title: 'Loan Approved',
      text: 'Your loan application of NGN200,000 has been approved.',
      time: '2 hours ago',
      unread: true
    },
    {
      title: 'Payment Received',
      text: 'You have received NGN300,000 from John Doe.',
      time: 'Yesterday',
      unread: true
    },
    {
      title: 'Airtime Purchase',
      text: 'You\'ve successfully purchased NGN5,000 airtime.',
      time: '14 Feb 2025',
      unread: false
    }
  ];

  return (
    <div className="notification-panel" id="notificationPanel">
      <div className="notification-header">
        <h3>Notifications</h3>
        <span id="closeNotifications" onClick={closeNotificationPanel}>✕</span>
      </div>
      <div className="notification-list">
        {notifications.map((notification, index) => (
          <div 
            key={index} 
            className={`notification-item ${notification.unread ? 'unread' : ''}`}
          >
            <div className="notification-title">{notification.title}</div>
            <div className="notification-text">{notification.text}</div>
            <div className="notification-time">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;