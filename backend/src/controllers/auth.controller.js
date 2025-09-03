const user = require("../models/user.model");

async function registerUser(req,res){
    try{
        const {fullName,email,password} = req.params;
    }catch(err){
        console.log("register controller: ",err);
    }
}
