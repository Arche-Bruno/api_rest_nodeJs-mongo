const express = require("express");
const {config} = require("dotenv");
const bodyParser= require("body-parser")
const mongoose = require("mongoose")
config();

const routers = require("./routes/book.route")





const app = express();

app.use(bodyParser.json());


//we will connect with the db

mongoose.connect(process.env.MONGO_URL,{dbName:process.env.MONGO_NAME_DB})
 const db=mongoose.connection;

 app.use('/books',routers);

 const port = process.env.PORT;
app.listen(port,()=>{
    console.log("listening in the port ", port);

})