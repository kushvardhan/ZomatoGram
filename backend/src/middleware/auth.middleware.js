const foodpartnerModel= require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){
     const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message:"User not authorised." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodpartner = await foodpartnerModel.findById(decoded.id);
        console.log("Food Partner from DB:", foodpartner);

        if (!foodpartner) {
            return res.status(401).json({ message: "Food Partner not found." });
        }

        req.foodpartner = foodpartner;
        next();
    } catch(err) {
        console.log("JWT error:", err);
        return res.status(401).json({ message: "Invalid token." });
    }
}

async function authUserMiddleware(req,res,next){

    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()
    }catch(err){
        console.log(err);
        return res.status(400).json({message:err.message});
    }
}

module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware,
}