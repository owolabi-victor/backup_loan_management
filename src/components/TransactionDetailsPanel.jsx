import React from 'react';

function TransactionDetailsPanel({ closeTransactionDetails }) {
  // Sample transaction details
  const transaction = {
    type: 'Buy Airtime',
    amount: 'NGN5,000',
    date: '14th February, 2025',
    status: 'Completed',
    provider: 'MTN',
    phoneNumber: '081********'
  };

  return (
    <div className="transaction-details-panel" id="transactionDetailsPanel">
      <div className="transaction-details-header">
        <div className="transaction-details-title">Transaction Details</div>
        <div 
          className="transaction-details-close" 
          id="closeTransactionDetails"
          onClick={closeTransactionDetails}
        >
          ✕
        </div>
      </div>
      <div className="transaction-details-content">
        <div className="transaction-details-item">
          <span className="detail-label">Transaction Type</span>
          <span className="detail-value">{transaction.type}</span>
        </div>
        <div className="transaction-details-item">
          <span className="detail-label">Amount</span>
          <span className="detail-value">{transaction.amount}</span>
        </div>
        <div className="transaction-details-item">
          <span className="detail-label">Date</span>
          <span className="detail-value">{transaction.date}</span>
        </div>
        <div className="transaction-details-item">
          <span className="detail-label">Status</span>
          <span className="detail-value">{transaction.status}</span>
        </div>
        {transaction.type === 'Buy Airtime' && (
          <>
            <div className="transaction-details-item">
              <span className="detail-label">Provider</span>
              <span className="detail-value">{transaction.provider}</span>
            </div>
            <div className="transaction-details-item">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{transaction.phoneNumber}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TransactionDetailsPanel;