const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Transaction', transactionSchema);
