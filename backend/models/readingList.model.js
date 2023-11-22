const mongoose = require("mongoose");

const readingListSchema = mongoose.Schema({
    userID: {type: String, required: true},
    title: {type: String, required: true},
    books: {type: Array, required: true},
}, {
    versionKey: false
})

const ReadingListModel = mongoose.model("readlingList", readingListSchema);

module.exports = {
    ReadingListModel
}