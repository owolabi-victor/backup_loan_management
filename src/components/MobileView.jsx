import React, { useState } from 'react';

function MobileView({ 
  openNotificationPanel, 
  openTransactionDetails, 
  openModal,
  toggleView 
}) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="app-container mobile-view" id="mobileView">
      <div className="app-header">
        <div className="user-info">
          <div className="avatar">
            <img src="/api/placeholder/40/40" alt="User Avatar" />
          </div>
          <div>
            <p>Hello,</p>
            <h3>Andrew!</h3>
          </div>
        </div>
        <div className="notification" id="notificationBell" onClick={openNotificationPanel}>
          <span>🔔</span>
          <span className="notification-badge">2</span>
        </div>
      </div>
      
      <div className="balance-card">
        <p className="balance-label">Your Balance</p>
        <div className="balance-amount">
          <span id="balanceText">
            {isBalanceVisible ? 'NGN 30,000.00' : '****'}
          </span>
          <span className="eye-icon" id="toggleBalance" onClick={toggleBalance}>👁️</span>
        </div>
        <p className="account-number">0000 7426 2183</p>
      </div>
      
      <div className="quick-actions">
        <div className="action-button" onClick={() => openModal('takeLoan')}>
          <span className="action-icon">💰</span>
          <span className="action-label">Take Loan</span>
        </div>
        <div className="action-button" onClick={() => openModal('payLoan')}>
          <span className="action-icon">💳</span>
          <span className="action-label">Pay Loan</span>
        </div>
        <div className="action-button" onClick={() => openModal('checkStatus')}>
          <span className="action-icon">📊</span>
          <span className="action-label">Check Status</span>
        </div>
        <div className="action-button" onClick={() => openModal('buyAirtime')}>
          <span className="action-icon">📱</span>
          <span className="action-label">Buy Airtime</span>
        </div>
      </div>
      
      <div className="transactions-section">
        <h3 className="section-title">Transactions</h3>
        
        {[
          {
            id: 'tx1',
            icon: '📱',
            type: 'Buy Airtime',
            date: '14th February, 2025',
            amount: 'NGN5,000'
          },
          {
            id: 'tx2',
            icon: '↘️',
            type: 'Receive',
            date: '11th December, 2024',
            amount: 'NGN300,000'
          },
          {
            id: 'tx3',
            icon: '💰',
            type: 'Take Loan',
            date: '8th October, 2024',
            amount: 'NGN200,000'
          }
        ].map(transaction => (
          <div 
            key={transaction.id} 
            className="transaction-item" 
            data-id={transaction.id}
            onClick={openTransactionDetails}
          >
            <div className="transaction-info">
              <div className="transaction-icon">{transaction.icon}</div>
              <div className="transaction-details">
                <span className="transaction-type">{transaction.type}</span>
                <span className="transaction-date">{transaction.date}</span>
              </div>
            </div>
            <div className="transaction-amount">{transaction.amount}</div>
          </div>
        ))}
      </div>
      
      <div className="bottom-nav">
        <div className="nav-item active-nav" id="homeNav">
          <span className="nav-icon">🏦</span>
        </div>
        <div className="nav-item" id="messagesNav">
          <span className="nav-icon">✉️</span>
        </div>
        <div className="nav-item" id="profileNav">
          <span className="nav-icon">👤</span>
        </div>
      </div>
      
      <button 
        style={{position: 'absolute', top: 10, right: 10}} 
        onClick={toggleView}
      >
        Switch View
      </button>
    </div>
  );
}

export default MobileView;