import React, { useState, useEffect } from 'react';
import '../BreakdownPage.css';

const BreakdownPage = () => {
  const [breakdownPage, setBreakdownPage] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    console.log('Fetching transactions...');
    fetch('http://localhost:3000/api/transactions')
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setBreakdownPage(data);
        const sum = data.reduce((total, transaction) => total + transaction.amount, 0);
        setTotalAmount(sum);

        const groupedData = data.reduce((grouped, transaction) => {
          if (!grouped[transaction.category]) {
            grouped[transaction.category] = [];
          }
          grouped[transaction.category].push(transaction.amount);
          return grouped;
        }, {});

        setGroupedTransactions(groupedData);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        alert('Error fetching transactions. See console for details.');
      });
  }, []);

  return (
    <div className="breakdown-container">
      <div className="card">
        <div className="card-title">Balance: {totalAmount} $</div>
        {Object.keys(groupedTransactions).map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-name">{category}</div>
            <div className="category-amount" style={{ color: groupedTransactions[category].reduce((sum, amount) => sum + amount, 0) < 0 ? 'red' : 'green' }}>
              {groupedTransactions[category].reduce((sum, amount) => sum + amount, 0)} $
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakdownPage;
