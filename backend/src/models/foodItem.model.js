const mongoose = require('mongoose');

const foodItems = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    }
});

const foodModel = mongoose.model("footitems", foodItems);

module.exports=foodModel;