import React, { useState } from 'react';

function WebView({ 
  openNotificationPanel, 
  openTransactionDetails, 
  openModal,
  toggleView 
}) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isSavingsVisible, setIsSavingsVisible] = useState(true);

  const toggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleSavings = () => {
    setIsSavingsVisible(!isSavingsVisible);
  };

  return (
    <div className="app-container web-view" id="webView">
      <div className="sidebar">
        <div className="logo">BankApp</div>
        <div className="sidebar-nav">
          <div className="sidebar-nav-item active" data-page="dashboard">
            <span>🏠</span>
            <span>Dashboard</span>
          </div>
          <div className="sidebar-nav-item" data-page="cards">
            <span>💳</span>
            <span>Cards</span>
          </div>
          <div className="sidebar-nav-item" data-page="analytics">
            <span>📊</span>
            <span>Analytics</span>
          </div>
          <div className="sidebar-nav-item" data-page="loans">
            <span>💰</span>
            <span>Loans</span>
          </div>
          <div className="sidebar-nav-item" data-page="airtime">
            <span>📱</span>
            <span>Airtime</span>
          </div>
          <div className="sidebar-nav-item" data-page="settings">
            <span>⚙️</span>
            <span>Settings</span>
          </div>
        </div>
        <div className="user-info" style={{marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee'}}>
          <div className="avatar">
            <img src="/api/placeholder/40/40" alt="User Avatar" />
          </div>
          <div>
            <p>Andrew</p>
            <p style={{fontSize: '12px', color: '#666'}}>Personal Account</p>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="notification" id="webNotificationBell" onClick={openNotificationPanel}>
            <span>🔔</span>
            <span className="notification-badge">2</span>
          </div>
        </div>
        
        <div className="cards-container">
          <div className="balance-card">
            <p className="balance-label">Your Balance</p>
            <div className="balance-amount">
              <span id="webBalanceText">
                {isBalanceVisible ? 'NGN 30,000.00' : '****'}
              </span>
              <span className="eye-icon" id="webToggleBalance" onClick={toggleBalance}>👁️</span>
            </div>
            <p className="account-number">0000 7426 2183</p>
          </div>
          
          <div className="balance-card" style={{backgroundColor: '#4A90E2'}}>
            <p className="balance-label">Savings</p>
            <div className="balance-amount">
              <span id="savingsBalanceText">
                {isSavingsVisible ? 'NGN 125,000.00' : '****'}
              </span>
              <span className="eye-icon" id="webToggleSavings" onClick={toggleSavings}>👁️</span>
            </div>
            <p className="account-number">Interest Rate: 3.5%</p>
          </div>
        </div>
        
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions" style={{marginBottom: '30px'}}>
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
          <h3 className="section-title">Recent Transactions</h3>
          
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

export default WebView;