const user = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const foodpartner = require("../models/foodpartner.model");


async function registerUser(req,res){
    try{
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userAlreadyExists = await user.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            fullName,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(400).json({ message: "Error while registering user." });
        }

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } 
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "New user created",
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.fullName,
            },
        });

    }catch(err){
        console.log("register controller: ",err);
    }
}

async function loginUser(req,res){
    try{
        const {email,password} = req.body;
        const userExists = await user.findOne({email});
        if(!userExists){
            return res.status(400).json({
                message:"Invalid Email or Password. "
            })
        }

        const isPasswordValid = await bcrypt.compare(password,userExists.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Email or Password. "
            })
        }

        const token = jwt.sign(
            { id: userExists._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } 
        );

        res.cookie("token", token);

        res.status(200).json({
            message:"User Logged In"
        })

    }catch(err){
        console.log(err);
    }
}

async function logout(req,res){
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        
        return res.status(200).json({ message: "User logged out successfully." });
    }catch(err){
        console.log(err);
    }
}

async function registerFoodPartner(req,res){
    try{
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userAlreadyExists = await foodpartner.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await foodpartner.create({
            fullName,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(400).json({ message: "Error while registering user." });
        }

        const token = jwt.sign(
  { id: newUser._id }, 
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

        res.cookie("token", token);

        res.status(201).json({
            message: "New food-partner user created",
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.fullName,
            },
        });
    }catch(err){
        console.log(err);
    }
}

async function loginFoodPartner(req,res){
    try{
        const {email,password} = req.body;
        const userExists = await foodpartner.findOne({email});
        if(!userExists){
            return res.status(400).json({
                message:"Invalid Email or Password. "
            })
        }

        const isPasswordValid = await bcrypt.compare(password,userExists.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Email or Password. "
            })
        }

        const token = jwt.sign(
  { id: userExists._id },   // 👈 must be _id
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

        res.cookie("token", token);

        res.status(200).json({
            message:"food-partner user Logged In",
            userExists
        })

    }catch(err){
        console.log(err);
    }
}

async function logoutFoodPartner(req,res){
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        
        return res.status(200).json({ message: "Food-partner User logged out successfully." });
    }catch(err){
        console.log(err);
    }
}

module.exports={
    registerUser,
    loginUser,
    logout,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}