const express = require('express');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const authenticate= require('../middlewares/authenticate')

router.get('/', (req,res)=>{
    res.send("Router home page")
})

router.post('/register',async (req,res)=>{
    await saveData(req,res)
})

router.post('/signin', async (req,res)=>{
    await signin(req,res)

})

router.get('/about', authenticate , (req, res)=>{
    console.log('this is about')
    res.send(req.rootUser)
})

const signin= async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password)
    if(!email || !password){
        return res.json({error:"Please filled email and password "})
    }
    try{
    const user = await User.findOne({email:email})
    if(user){
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = await user.generateToken()
            res.cookie('jwtoken',token,{
                expires: new Date(Date.now()+ 258920000000),
                httpOnly:true
            });
            return res.status(200).json({message:"Welcome to dashboard"})
        }
        else{
            return res.status(400).json({error:"invalid credentials"})
        }
    }else{
        return res.status(400).json({error:"invalid credentials"})
    }
}catch(err){
    console.log("Error"+err)
}
}

const saveData = async (req,res)=>{
    const {name1,phone,email,password,cpassword,profession}=req.body
    
    try{
        const user =new User({name:name1,phone:phone,email:email,password:password,cpassword:cpassword,work:profession})
        const res1 = await user.save()
        return res.status(200).json({message:"Data saved successfully"})
    }catch(err){
        return res.json({'Error' : err})
    }
}



module.exports = router;