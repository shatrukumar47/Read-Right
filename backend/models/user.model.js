const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    image: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
},{
    versionKey: false
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}