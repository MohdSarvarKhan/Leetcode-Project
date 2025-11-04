const redisClient = require('../config/redis');
const User = require('../models/user');
const validate = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{

    try{

        validate(req.body);

        const {firstName,emailId,password} = req.body;
        req.body.password = await bcrypt.hash(password, 10);

       const user = await User.create(req.body);

       const token = jwt.sign({_id:user._id , emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60})
       res.cookie('token',token,{maxAge : 60*60*1000});
       res.status(201).send("User Registered Succesfully");

    }

    catch(err){
        res.status(400).send("Error : " + err);
    }
}

const login = async (req,res)=>{

    try{
        const {emailId , password} = req.body;

        if(!emailId)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({emailId});
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password,user.password);

        if(!match)
            throw new Error("Invalid Credentials")

        const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});

        res.status(200).send("Logged In Succesfully");

    }
    catch(err){
        res.status(400).send("Error : " + err);
    }
}

const logout = async (req,res)=>{
    try{

        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logged Out Succesfully");

    }

    catch(err){
        res.status(503).send("Error: " + err);

    }
}

const getProfile = (req,res)=>{
    console.log("hello man ");
}

module.exports = {register,login,logout,getProfile};