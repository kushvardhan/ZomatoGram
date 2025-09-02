const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION)
    .then(()=>{
        console.log("MongoDB Connected")
    })
    .catch((error)=>{
        console.log("Error connecting with DB: ", error)
    })
}

module.exports = connectDB;