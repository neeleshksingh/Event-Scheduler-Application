const mongoose = require('mongoose')
const Schema = mongoose.Schema

const event = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now }
})

const Event = mongoose.model("Event", event)

module.exports = Event