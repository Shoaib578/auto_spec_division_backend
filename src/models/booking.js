const mongoose = require('mongoose')

const BookingShema =new mongoose.Schema({
    customer_full_name:{
        type:String
    },
    car_name:{
        type:String
    },
    car_model:{
        type:String
    },
    customer_address:{
        type:String
    },
    phone_no:{
        type:String
    },
    car_year:{
        type:String
    },
    car_make:{
        type:String
    },
    email:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    },
    message:{
        type:String
    },
    requested_time:{
        type:String
    }

  
    },{
    timestamps: true,
  })

const Booking = mongoose.model('booking',BookingShema)
module.exports =Booking