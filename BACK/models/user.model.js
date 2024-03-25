
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    gender: {
        type: String,
        required:true,
        enum: ['MALE','FEMALE']
    },
    profilePic: {
        type: String,
        default: ""
    }
    //createdAt, updatedAt
},{ timestamps: true })

const User = mongoose.model("User",userSchema)

module.exports = {
    User
}