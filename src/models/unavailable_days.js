const mongoose = require('mongoose')

const UnavailableDaysSchema =new mongoose.Schema({
    day_name:{
        type:String
    }
})

const UnavailableDays = mongoose.model('UnavailableDays',UnavailableDaysSchema)
module.exports = UnavailableDays