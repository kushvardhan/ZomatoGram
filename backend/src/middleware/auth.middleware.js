const foodpartnerModel= require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){
     const token = req.cookies.token;
    console.log("Token from cookies:", token); // 👀 check if token exists

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

module.exports={
    authFoodPartnerMiddleware,
}