const userModel = require("../models/user.model");
const tokenBlacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Register a new user
 * @access Public
 */
async function registerUserController(req ,res){
    try {
        const { username , email , password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const IfUserAlreadyexists = await userModel.findOne({ email });

        if(IfUserAlreadyexists){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userModel.create({ username , email , password:hashedPassword });

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || "defaultsecret",{expiresIn:"1h"});

        res.cookie("token" , token , {
            httpOnly : true,
            secure : true,
            maxAge : 1000 * 60 * 60 * 24 * 7
        });

        res.status(201).json({ message: "User registered successfully" , token});
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

async function loginUserController(req ,res){
    try {
        const {email , password} = req.body;
        if (!email||!password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || "defaultsecret",{expiresIn:"1h"});

        res.cookie("token" , token , {
            httpOnly : true,
            secure : true,
            maxAge : 1000 * 60 * 60 * 24 * 7
        });

        res.status(200).json({ message: "User logged in successfully" , token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @route GET /api/auth/logout
 * @desc Logout a user claear token from a cookie
 * @access public
 */
async function logoutUSerController(req , res) {
    try {
        const token = req.cookies?.token || req.token;

        if (token){
            await tokenBlacklistModel.create({token});
            res.clearCookie("token");
        }
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getMeController(req , res){
    try {
        const user = await userModel.findById(req.user.id).select("-password");

        const token = req.cookies?.token || req.token;
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({token});
        if(isTokenBlacklisted){
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports ={
    registerUserController ,
    loginUserController , 
    logoutUSerController ,
    getMeController
}