require('dotenv').config();
const util = require('util')
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology: true,});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

async function getTransacrionDataFromDb(){
    try{
        const TransactionData = require("./TransactionData");
        return await TransactionData.find({});
    }
    catch(e){
        console.log("\x1b[31m",'>>>>>>>>>> error in getTransacrionDataFromDb: \n',e);
    }
}

function showDataToConsole(db_tx){
    console.log("\x1b[32m",util.inspect(db_tx, {showHidden: false, depth: null}))
    mongoose.connection.close();
}

getTransacrionDataFromDb().then(db_tx =>  showDataToConsole(db_tx) );
