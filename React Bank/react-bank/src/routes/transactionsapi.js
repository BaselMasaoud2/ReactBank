
const express = require("express");
const router = express.Router();
const TransactionController = require("./transactionController");
router.post("/", async function (req, res) {
  try {
    const transaction = await TransactionController.addTransaction(req.body);
    res.send(transaction);
  } catch (err) {
    res.status(301).send({ message: err.message });
  }
});
router.get("/", async function (req, res) {
  try {
    const transactions = await TransactionController.getAllTransaction();
    res.send(transactions);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});
router.get('/categories', async function (req, res) {
  
  try {
    const categories = await TransactionController.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/byCategory/sum", async function (req, res) {
  try {
    const transactionsByCategory = await TransactionController.getSumOfTransactionsByCategory();
    res.json(transactionsByCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/currency/:currency", async function (req, res) {
  const { currency } = req.params;

  if (currency === "il") {
    return res.send({ result: 3.7 });
  } else {
    return res.send({ result: 1 });
  }
});
router.get("/balance", async function (req, res) {
  try {
    const balance = await TransactionController.getBalance();

    res.send({ balance });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});
router.delete('/transaction/:_id', async (req, res) => {
  try {
      const result = await TransactionController.deleteTransaction(req.params._id);
      
      if (!result) {
          return res.status(404).send('Transaction not found');
      }
      res.status(200).send(`Transaction deleted: ${req.params._id}`);
  } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).send(error.message);
  }
});
module.exports = router;