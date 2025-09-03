const express = require('express');
const router = express.Router();
const {registerUser,
    loginUser,
    logout,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner} = require("../controllers/auth.controller");


// User-Auth
router.post('/user/sign-up', registerUser );
router.post('/user/sign-in', loginUser);
router.post('/user/logout', logout);

// Food-Partner-Auth
router.post('/food-partner/sign-up', registerFoodPartner );
router.post('/food-partner/sign-in', loginFoodPartner);
router.post('/food-partner/logout', logoutFoodPartner);

module.exports=router;