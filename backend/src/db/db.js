const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log("Error connecting with DB:", err.message));
}

module.exports = connectDB;
