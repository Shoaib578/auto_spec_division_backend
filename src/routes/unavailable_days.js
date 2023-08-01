const UnavailableDays = require('../models/unavailable_days')

const router = require('express').Router()


router.post('/insert_day',(req,res)=>{
    const day_name = req.body.day_name
   
    const new_day = new UnavailableDays({
        day_name: day_name
    })

    new_day.save()
    return res.json({
        "is_added":true,
        "status":"Inserted successfully"
    })
})

router.get('/get_days',(req,res)=>{
    UnavailableDays.find()
    .then(data=>{
        return res.json({
            "data":data
        })
    })
})

router.delete('/delete_day',(req,res)=>{
    const day_id = req.query.day_id
    UnavailableDays.findOneAndDelete({_id: day_id})
    .then(()=>{
        res.json({
            "is_deleted":true,
            "status":"Day deleted successfully"
        })
    })
})


module.exports = router