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
        res.status(400).send({"error": error.message})
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
                    res.status(200).send({msg:"Logged-in successfully", accessToken: accessToken, user: {_id:checkUser?._id ,username: checkUser?.username, email: checkUser?.email, role: checkUser?.role}})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error": error.message}) 
    }
})

//Update a User
userRoute.patch("/update/:id", async (req, res)=>{
    const {username, email, password, role} = req.body;
    const {id} = req.params;
    try {
        const user = await UserModel.findOne({_id: id});
        if(!user){
            res.status(200).send({"msg": "User not found!"})
        }else{
            bcrypt.hash(password, +process.env.saltRounds, async (err, hash)=>{
                if(err){
                    res.status(400).send({"error": err})
                }
                const user = await UserModel.findByIdAndUpdate({_id: id}, {username, role, password: hash, email} )
                const updatedUser = await UserModel.findOne({_id: id});
                res.status(200).send({ message: "Updated successfully", user: {_id: updatedUser?._id, username: updatedUser?.username, role: updatedUser?.role, email: updatedUser?.email}});
            })
        }
        
    } catch (error) {
        res.status(400).send({"error": error.message}) 
    }
})

//Delete a user by admin
userRoute.delete("/delete/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        await UserModel.findByIdAndDelete({_id: id});
        res.status(200).send({"msg": `User with _id: ${id} deleted successfully`})
    } catch (error) {
        res.status(400).send({"error": error.message}) 
    }
})


//Get all users by admin
userRoute.get("/allusers", async (req, res)=>{
    try {
        const users = UserModel.find();
        res.status(200).json({users: users})
    } catch (error) {
        res.status(400).send({"error": error.message}) 
    }
})



module.exports = {
    userRoute
}