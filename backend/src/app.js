const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/auth.routes");

app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('he');
})

app.use('/api/auth', authRouter);

module.exports=app;