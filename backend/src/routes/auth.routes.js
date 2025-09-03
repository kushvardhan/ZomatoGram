const express = require('express');
const router = express.Router();

router.post('/user/sign-up',async(req,res)=>{
    try{

    }catch(err){
        console.log("Signup-ERROR: ",err);
    }
});

router.post('/user/sign-in', async(req,res)=>{
    try{

    }catch(err){
        console.log("SignIn-ERROR: ",err);
    }
});

router.get('/logout', async(req,res)=>{
    try{

    }catch(err){
        console.log("Signup-ERROR: ",err);
    }
});

module.exports=router;