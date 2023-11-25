const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { PurchaseModel } = require("../models/purchase.model");

const purchaseRoute = express.Router();

//Get purchase history of a user
purchaseRoute.get("/", authMiddleware, async (req, res)=>{
    const {userID} = req.body;
    try {
        const purchaseHistory = await PurchaseModel.find({userID: userID});
        res.status(200).json(purchaseHistory)
    } catch (error) {
        res.status(400).send({"error": error.message})
    }
})

//Get a single purchase by id
purchaseRoute.get("/:id", authMiddleware, async (req, res)=>{
    const {id} = req.params;
    try {
        const purchase = await PurchaseModel.findOne({_id: id});
        if(!purchase){
            res.status(200).send({"msg": "Not found!"});
        }else{
            res.status(200).json(purchase);
        }
        
    } catch (error) {
        res.status(400).send({"error": error.message})
    }
})

//Create a purchase
purchaseRoute.post("/create",authMiddleware, async(req, res)=>{
    try {
        const newPurchase = new PurchaseModel(req.body);
        await newPurchase.save();
        res.status(200).send({"msg": "New purchase created successfully"})
    } catch (error) {
        res.status(400).send({"error": error.message})
    }
})

// Cancel or Delete a purchase
purchaseRoute.delete("/delete/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        await purchaseRoute.findByIdAndDelete({_id: id});
        res.status(200).send({"msg": `Purchase with id: ${id} deleted successfully`})
    } catch (error) {
        res.status(400).send({"error": error.message})
    }
})



module.exports = {
    purchaseRoute
}