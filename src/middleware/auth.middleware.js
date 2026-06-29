const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const tokenBlacklistModel = require("../models/blacklist.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)  

        req.user = decoded;

        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
};
