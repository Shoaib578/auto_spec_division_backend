const Car = require('../models/car')

const router = require('express').Router()

router.post('/insert_car',(req,res)=>{
    const car_name = req.body.car_name
    console.log(car_name)
    const new_car = new Car({
        car_name: car_name
    })

    new_car.save()
    return res.json({
        "is_added":true,
        "status":"Inserted successfully"
    })
})

router.get('/get_cars',(req,res)=>{
    Car.find()
    .then(data=>{
        return res.json({
            "data":data
        })
    })
})

router.delete('/delete_car',(req,res)=>{
    const car_id = req.query.car_id
    Car.findOneAndDelete({_id: car_id})
    .then(()=>{
        res.json({
            "is_deleted":true,
            "status":"Car deleted successfully"
        })
    })
})


module.exports = router