const mongoose = require('mongoose');
require("dotenv").config();

//Database connection URL
const dbUrl = process.env.DB_KEY;

//Conect to the database
const connectToMongo = () => {
    mongoose.connect(dbUrl)

    mongoose.connection.on("Connected", () => {
        console.log("Connected to the database");
    })

    mongoose.connection.on("error", (error) => {
        console.log("Database connection error: ", error);
    })
    
}


module.exports = { connectToMongo };
