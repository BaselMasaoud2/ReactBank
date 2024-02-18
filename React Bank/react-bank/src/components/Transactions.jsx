import React, { useState, useEffect } from 'react';
import '../Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    console.log('Fetching transactions...');
    fetch('http://localhost:3000/api/transactions')
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setTransactions(data);
        const sum = data.reduce((total, transaction) => total + transaction.amount, 0);
        setTotalAmount(sum);
      })
      .catch(error => {
        console.error('Error fetching transaction:', error);
        alert('Error fetching transaction. See console for details.');
      });
  }, []);

  const handleDeleteTransaction = async (_id) => {
    try {
        console.log(`Attempting to delete transaction with id ${_id}`);
        const response = await fetch(`http://localhost:3000/api/transactions/transaction/${_id}`, {
          method: 'DELETE',
        });
        console.log(response);  
        if (!response.ok) {
            console.error(`Failed to delete transaction with id ${_id}. Status: ${response.status}`);
            return;
        }
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction._id !== _id)
        );
        console.log(`Delete transaction with id ${_id} successful`);
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
};
  return (
    <div className="container">
      <div className="balance">Balance: {totalAmount} $</div>
      {transactions.map((transaction) => (
        <div key={transaction._id} className="transactionItem">
          <div className="transactionContent">
            <div className="transactionTitleAmount">
              <div className="transactionTitle">{transaction.vendor}</div>
              <div className="transactionAmount" style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>
                {transaction.amount} $
              </div>
            </div>
            <div className="transactionCategory">{transaction.category}</div>
          </div>
          <div className="deleteButtonContainer">
            <button
              className="deleteButton"
              onClick={() => handleDeleteTransaction(transaction._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
