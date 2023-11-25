const express = require("express");
const { CommunityDiscModel } = require("../models/communityDiscussion.model");

const communityDiscRoute = express.Router();

//Get all discussions
communityDiscRoute.get("/", async (req, res) => {
  try {
    const allDiscussions = await CommunityDiscModel.find();
    res.status(200).json(allDiscussions);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Get a single discussion by id
communityDiscRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const discussion = await CommunityDiscModel.findOne({ _id: id });
    if (discussion) {
      res.status(200).json(discussion);
    } else {
      res.status(200).send({ msg: "Discussion not found!" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Create a discussion
communityDiscRoute.post("/create", async (req, res) => {
  try {
    const newDiscussion = new CommunityDiscModel(req.body);
    newDiscussion.save();
    res
      .status(200)
      .send({
        msg: "Discussion created successfully",
        discussion: newDiscussion,
      });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Update a discussion by id
communityDiscRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const checkDiscussion = await CommunityDiscModel.findOne({ _id: id });
    if (!checkDiscussion) {
      res.status(200).send({ msg: "Discussion not found!" });
    } else {
      await CommunityDiscModel.findByIdAndUpdate({ _id: id }, req.body);
      const updateDiscussion = await CommunityDiscModel.findOne({ _id: id });
      res
        .status(200)
        .send({ msg: "Updated successfully", discussion: updateDiscussion });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Delete a discussion by id
communityDiscRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CommunityDiscModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  communityDiscRoute,
};
