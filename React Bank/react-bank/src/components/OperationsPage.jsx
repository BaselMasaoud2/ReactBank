import React, { useState, useEffect } from 'react';
import '../OperationsPage.css';

export default function OperationsPage() {
  const [amount, setAmount] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    console.log("Transactions updated:", transactions);
  }, [transactions]);
  const handleDeposit = async () => {
    try {
      if (!amount || !vendor || !category) {
        setSuccessMessage(<span style={{ color: 'red' }}>Please fill in all required fields.</span>);
        return;
      }
      await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          vendor,
          category,
        }),
      });
      setAmount('');
      setVendor('');
      setCategory('');
      setSuccessMessage('Deposit successful');
      setTransactions([...transactions, { amount, vendor, category, type: 'Deposit' }]);
      console.log('Deposit successful');
    } catch (error) {
      console.error('Error depositing:', error);
      setSuccessMessage('Error depositing. See console for details.');
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!amount || !vendor || !category) {
        setSuccessMessage(<span style={{ color: 'red' }}>Please fill in all required fields.</span>);
        return;
      }
      await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: -Math.abs(amount), 
          vendor,
          category,
        }),
      });
      setAmount('');
      setVendor('');
      setCategory('');
      setSuccessMessage('Withdraw successful');
      setTransactions([...transactions, { amount: -Math.abs(amount), vendor, category, type: 'Withdraw' }]);
      console.log('Withdraw successful');
    } catch (error) {
      console.error('Error withdrawing:', error);
      setSuccessMessage('Error withdrawing. See console for details.');
    }
  };
  

  return (
    <div className="operations-container">
      <div className="card">
        <h2 className="card-title">Insert Transactions</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="input-container">
          <label htmlFor="transactionAmount">Transaction amount</label>
          <input
            type="text"
            id="transactionAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="transactionVendor">Transaction vendor</label>
          <input
            type="text"
            id="transactionVendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="transactionCategory">Transaction category</label>
          <input
            type="text"
            id="transactionCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="deposit-button" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="withdraw-button" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
