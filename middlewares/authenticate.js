const jwt = require('jsonwebtoken')
const {parseCookies}=require('nookies');
const User = require('../models/User')

const authenticate = async(req,res,next) => {
    try{
        const parsedCookies = parseCookies({req})
        const token = parsedCookies.jwtoken
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
        
        if(!rootUser){
            throw new Error("User not found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(e){
        res.status(401).json('Unauthorized Token not provided')
        
        console.log("Error"+e)
    }
}

module.exports = authenticate;