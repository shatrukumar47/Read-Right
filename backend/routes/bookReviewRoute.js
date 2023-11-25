const express = require("express");
const { BookReviewModel } = require("../models/bookReview.model");
const authMiddleware = require("../middlewares/auth.middleware");

const bookReviewRoute = express.Router();

//Get all review by bookID
bookReviewRoute.get("/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        const reviews = await BookReviewModel.find({bookID: id});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

//post a review
bookReviewRoute.post("/create",authMiddleware, async(req, res)=>{
    try {
        const newReview = new BookReviewModel(req.body);
        newReview.save();
        res.status(200).send({"msg": "Review posted", review: newReview});

    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

//delete a review by id
bookReviewRoute.delete("/delete/:id", authMiddleware, async(req, res)=>{
    const {id} = req.params;
    try {
        await BookReviewModel.findByIdAndDelete({_id: id});
        res.status(200).send({"msg": "Deleted successfully"})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})


module.exports = {
    bookReviewRoute
}