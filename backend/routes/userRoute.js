const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/user.model");

const userRoute = express.Router();

//Registeration
userRoute.post("/signup", async (req, res)=>{
    const {username, email, password, role} = req.body;
    try {
        const existingUser = await UserModel.findOne({email: email});
        if(existingUser){
            res.status(400).send({"msg": "Already Registered !!"})
        }else{
            bcrypt.hash(password, +process.env.saltRounds, async (err, hash)=>{
                if(err){
                    res.status(400).send({"error": err})
                }
                const user = new UserModel({username, email, password:hash, role});
                await user.save();
                res.status(200).send({ message: "Registered successfully" });
            })
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

//Login
userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    try {
        let checkUser = await UserModel.findOne({email: email});
        if(!checkUser){
            res.status(200).send({ message: "User Not Found !!" });
        }else{
            bcrypt.compare(password, checkUser?.password, (error, result)=>{
                if(!result){
                    res.status(200).send({ message: "Wrong Password !!" });
                }else{
                    const accessToken = jwt.sign({userID: checkUser?._id, username: checkUser?.username}, "shatru47");
                    res.status(200).send({msg:"Logged-in successfully", accessToken: accessToken, username: checkUser?.username})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error": error}) 
    }
})


module.exports = {
    userRoute
}