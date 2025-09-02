const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('he');
})

module.exports=app;