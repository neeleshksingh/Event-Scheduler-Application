const mongoose = require('mongoose')
mongoose.set(`strictQuery`, true)
async function getConnection(){
    await mongoose.connect("mongodb://localhost:27017/event-scheduler").then(()=>{
        console.log("connected to database");
    })
}

module.exports = getConnection