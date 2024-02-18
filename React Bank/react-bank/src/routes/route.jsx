// // routes.js
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');  // הוסף קו זה
// const Transaction = require('../models/transaction');

// // Get all transactions
// router.get('/transactions', async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete a transaction by ID
// router.delete('/transactions/:id', async (req, res) => {
//   try {
//     // השורה הזו מציינת שאם ה-ID אינו תקין, ייזרק שגיאה
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid transaction ID' });
//     }

//     const result = await Transaction.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });

//     if (result.deletedCount === 0) {
//       console.error('Transaction not found');
//       return res.status(404).json({ error: 'Transaction not found' });
//     }

//     console.log('Transaction deleted successfully');
//     res.json({ message: 'Transaction deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting transaction:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get total balance
// router.get('/transactions/total', async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
//     res.json({ totalAmount });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Add a new transaction (Deposit)
// router.post('/transactions/deposit', async (req, res) => {
//   try {
//     const { amount, vendor, category } = req.body;

//     if (!amount || !vendor || !category) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newTransaction = new Transaction({
//       title: vendor,
//       amount: Number(amount),
//       category,
//     });

//     await newTransaction.save();

//     res.json({ message: 'Transaction added successfully' });
//   } catch (error) {
//     console.error('Error adding transaction:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
