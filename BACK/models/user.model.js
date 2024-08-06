
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
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    lockoutUntil: {
        type: Date,
        default: null
    }
    //createdAt, updatedAt
},{ timestamps: true })

const User = mongoose.model("User",userSchema)

module.exports = {
    User
}