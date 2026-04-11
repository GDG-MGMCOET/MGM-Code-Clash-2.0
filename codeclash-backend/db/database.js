const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.MONGODB_URI;

const databaseConnection = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("Error connecting MongoDB", error);
  }
};

module.exports = databaseConnection;
