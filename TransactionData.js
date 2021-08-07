const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    status: Boolean,
    blockHash:    String,
    blockNumber:  Number,
    contractAddress:  String,
    transactionHash: String,
    transactionIndex: String,
    cumulativeGasUsed: Number,
    from: String,
    to: String,
    gasUsed: Number,
    logs: [{
                address: String,
                topics: [],
                data: String,
                blockNumber: Number,
                transactionHash: String,
                transactionIndex: Number,
                blockHash: String,
                logIndex: Number,
                removed: Boolean,
                id: String
        }],
    logsBloom: String,
    type: String
  })
  


  module.exports = mongoose.model('TransactionData',TransactionSchema);
