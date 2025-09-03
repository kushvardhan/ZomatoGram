const foodpartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"User not authorised."
        })
    }
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodpartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;

    next();

    }catch(err){
        console.log(err);
        return res.status(401).json({ message: "Invalid token." })
    }
}

module.exports={
    authFoodPartnerMiddleware,
}