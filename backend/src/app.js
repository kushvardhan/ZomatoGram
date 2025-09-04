const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/auth.routes");
const foodRouter = require("./routes/food.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('he');
})

app.use('/api/auth', authRouter);
app.use("/api/food", foodRouter);

module.exports=app;