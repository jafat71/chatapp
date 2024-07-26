const mongoose = require('mongoose')
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connection with Mongo Established Succefully!")
        return true
    } catch (error) {
        console.log("Error connecting DB: " + error)
        return false
    }
}

module.exports = {
    connect
}