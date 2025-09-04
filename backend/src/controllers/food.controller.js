const foodModel = require("../models/foodItem.model");
const {uploadFile} = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req,res){
    try{
        const fileUploadResult = await uploadFile(req.file.buffer , uuid());
        
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodpartner : req.foodpartner._id,
        })

        res.status(201).json({
            message:"Food Item created Successfully.",
            food: foodItem,
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({ err: err.message })
    }
}

async function getFoodItems(req,res){
    try{
        const foodItems = await foodModel.find({});

        res.status(200).json({
            message:"Food items fetched successfully",
            foodItems
        })
    }catch(err){
         console.log(err);
        return res.status(400).json({message:err.message});
    }
}

module.exports = {
    createFood,
    getFoodItems,
}