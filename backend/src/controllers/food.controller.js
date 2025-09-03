const foodModel = require("../models/foodItem.model");

async function createFood(req,res){
    try{

    }catch(err){
        console.log(err);
                return res.status(401).json({ message: err })
    }
}

module.exports = {
    createFood,
}