require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000
const cookieParser = require("cookie-parser")

const authRoutes  = require("./routes/auth.routes")
const messageRoutes  = require("./routes/message.routes")
const usersRoutes = require("./routes/users.routes")

const db = require("./db/config")

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",usersRoutes)


app.get("/",(req,res)=>{
    res.json({
        msg:"Server running"
    })
})

app.listen(PORT,async()=>{
    console.log("Server running in port " + PORT)
    await db.connect()
})