require('dotenv').config()

var Web3 = require("web3");
var provider = process.env.POLYGON_ENDOINT;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
const TransactionData = require("./TransactionData");

//save model
async function setAndSaveTransactionData(tx) {
    txData = new TransactionData({
        status: tx.status,
        transactionHash: tx.transactionHash,
        blockHash: tx.blockHash,
        transactionIndex:  tx.transactionIndex,
        blockNumber: tx.blockNumber,
        contractAddress: tx.contractAddress,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        from: tx.from,
        to: tx.to,
        gasUsed: tx.gasUsed,
        logs: tx.logs,
        logsBloom: tx.logsBloom,
        type: tx.type,
    });
    await txData.save();
    mongoose.connection.close();
}

//get transaction
async function getTransaction() {
  return await web3.eth.getTransactionReceipt(
    "0x2b1cb0ee5c14b33d1871a671c235dce2972861a1ad1410659251f0b9d7fac39f"
  );
}

async function getTransactionAndPopulateData(){
    let txDB = await TransactionData.find({transactionHash:"0x2b1cb0ee5c14b33d1871a671c235dce2972861a1ad1410659251f0b9d7fac39f"});
    if(txDB.length == 0){
        try{
            tx = await getTransaction();
            savedModel = await setAndSaveTransactionData(tx);
        }
        catch(e){
            console.log("\x1b[31m",'>>>>>>>>>> error in getTransaction: \n',e);
        }
    }

    mongoose.connection.close();
}

getTransactionAndPopulateData();
