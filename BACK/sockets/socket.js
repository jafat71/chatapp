
const {Server} = require('socket.io')
const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET","POST"]
    }
});

const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]

const userSocketMap = {}

io.on("connection",(socket)=>{

    const userId = socket.handshake.query.id
    if(userId!=="undefined") userSocketMap[userId] = socket.id

    io.emit("getOnlineusers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
        io.emit("getOnlineusers", Object.keys(userSocketMap))

    })
})

module.exports = {
    app,
    io, 
    server,
    getReceiverSocketId
}