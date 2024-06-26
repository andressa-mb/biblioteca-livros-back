/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv/config");

// Database connection URL
const dbUrl = process.env.DB_KEY;

// Connect to the database
const connectToMongo = () => {
  mongoose.connect(dbUrl);

  mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
};

module.exports = connectToMongo;