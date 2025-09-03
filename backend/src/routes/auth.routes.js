const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout} = require("../controllers/auth.controller");

router.post('/user/sign-up', registerUser );

router.post('/user/sign-in', loginUser);

router.get('/logout', logout);

module.exports=router;