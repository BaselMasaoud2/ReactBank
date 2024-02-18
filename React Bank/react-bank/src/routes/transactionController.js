const Transaction = require("../models/transaction");

class TransactionController {
  async getAllTransaction() {
    return Transaction.find({});
  }
async getAllCategories() {
  const categories = await Transaction.distinct('category');
  return categories.map((category) => ({ _id: category, count: 0 }));
}
  async addTransaction(transaction) {
    const t1 = new Transaction(transaction);
    const newTransaction = await t1.save();
    return newTransaction;
  }
  async deleteTransaction(id) {
    const transaction = await Transaction.findById(id);
    if (transaction) {
      await Transaction.deleteOne({ _id: id });
      return true;
    }
    return false;
  }
  async getSumOfTransactionsByCategory() {
    const transaction = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: "$amount",
          },
        },
      },
    ]);
    return transaction;
  }
  async getBalance() {
    const transaction = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          count: {
            $sum: "$amount",
          },
        },
      },
    ]);
    return transaction;
  }
}
module.exports = new TransactionController();
