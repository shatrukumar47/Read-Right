const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { ReadingListModel } = require("../models/readingList.model");

const readingListRoute = express.Router();

//get all list for public
readingListRoute.get("/", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//get all list by userID
readingListRoute.get("/", authMiddleware, async (req, res) => {
  const { userID } = req.body;
  try {
    const list = await ReadingListModel.find({ userID: userID });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  readingListRoute,
};
