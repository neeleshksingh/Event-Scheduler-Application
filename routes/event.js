const express = require('express')
const Event = require('../models/event')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post("/", async (req,res)=>{
    console.log(req.body);
    const {title, description, location, startTime, endTime} = req.body
    try{
        const data = await Event.create({
            title, description, location, startTime, endTime
        })
        if(data){
            return res.status(201).json({
                status : "success",
                data
            })
        }
        else{
            return res.status(400).json({status:"failed"})
        }
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

router.get("/", async(req,res)=>{
    try{
        const data = await Event.find()
        if(data){
            return res.status(200).json({
                status: "success",
                data
            })
        }
        else{
            return res.status(400).json({
                status: "failed"
            })
        }
    } catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const data = await Event.findOne({_id:req.params.id})
        if(data){
            return res.status(200).json({
                status: "success",
                data
            })
        }
        else{
            return res.status(400).json({
                status: "failed",
                message : "No event with that id"
            })
        }
    }catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const data = await Event.findOne({_id:req.params.id})
        if(data){
            const del = await Event.deleteOne({_id:req.params.id})
            return res.status(204).json({
                status: "success",
                del
            })
        }
        else{
            return res.status(400).json({
                status: "failed",
                message : "No event with that id"
            })
        }
    }catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const data = await Event.findOne({_id:req.params.id}) 
        if(data){
            const {title, description, location, startTime, endTime} = req.body
            if(!title){
                return res.status(400).json({
                    status : "failed",
                    error : "Validation error : title is required"
                })
            }
            if(!description){
                return res.status(400).json({
                    status : "failed",
                    error : "Validation error : description is required"
                })
            }
            if(!location){
                return res.status(400).json({
                    status : "failed",
                    error : "Validation error : location is required"
                })
            }
            if(!startTime){
                return res.status(400).json({
                    status : "failed",
                    error : "Validation error : startTime is required"
                })
            }
            if(!endTime){
                return res.status(400).json({
                    status : "failed",
                    error : "Validation error : endTime is required"
                })
            }

            const updated = await Event.updateOne({_id:req.params.id}, {...req.body})
            return res.status(200).json({
                status: "success",
                updated
            })
        }
        else{
            return res.status(400).json({
                status: "failed",
                message : "No event with that id"
            })
        }
    }catch(e){
        return res.status(404).json({
            error : e.message
        })
    }
})

module.exports = router