const mongoose = require('mongoose');

const foodItems = new mongoose.Schema({

});

const foodItemsModel = mongoose.model("footitems", foodItems);

module.exports=foodItemsModel;