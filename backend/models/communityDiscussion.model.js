const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
    title: {type:String, required: true},
    content: {type:String, required: true},
    topic: {type:String, required: true},
},{
    versionKey: false
})

const CommunityDiscModel = mongoose.model("communityDiscussion", discussionSchema);

module.exports = {
    CommunityDiscModel
}