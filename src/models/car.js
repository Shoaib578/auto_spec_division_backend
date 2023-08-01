const mongoose = require('mongoose')

const CarSchema =new mongoose.Schema({
    car_name:{
        type:String
    }
})

const Car = mongoose.model('Car',CarSchema)
module.exports = Car