require('dotenv').config()
const express = require("express")
const cors = require('cors'); 
const PORT = process.env.PORT || 8000
const cookieParser = require("cookie-parser")

const authRoutes  = require("./routes/auth.routes")
const messageRoutes  = require("./routes/message.routes")
const usersRoutes = require("./routes/users.routes")

const db = require("./db/config")
const { app, server } = require('./sockets/socket')
const path = require("path")

const corsOptions = {
    origin: ["https://chatapp-mpyu.onrender.com","http://localhost:5173"], // Dirección de Vite
    credentials: true, // Permitir el envío de cookies
    optionsSuccessStatus: 200 // Algunas navegadores antiguos (IE11, varios SmartTVs) fallan si no devuelven 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",usersRoutes)

app.use(express.static(path.join(__dirname, "../FRONT/chat/dist")))
// app.get("/",(req,res)=>{
//     res.json({
//         msg:"Server running"
//     })
// })

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../FRONT/chat/dist/index.html"))
})

server.listen(PORT,async()=>{
    console.log("Server running in port " + PORT)
    await db.connect()
})