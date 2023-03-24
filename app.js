const express = require('express')
const Event = require('./routes/event')
const connection = require('./connections/connection')
connection()

const app = express()

app.use("/v1/events", Event)

app.get("*", (req,res)=>{
    res.status(404).send("API NOT FOUND")
})

app.listen(3000 || process.env.PORT, ()=>{console.log("listening on port 3000")})