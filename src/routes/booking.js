const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

const router = require('express').Router();


const send_mail = (status,to,car_name,requested_time)=>{
    const subject = "Auto Spec Division Booking Updates"
    const from = 'theshoaibihsan10@gmail.com'
    const message = `Your Booking Has Been ${status}
    Car: ${car_name}
    Requested Time : ${requested_time}
    `
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
          user: 'theshoaibihsan10@gmail.com',
          pass: 'fkivcbzhytgygjxa',
        },
      });
      transporter.verify().then(console.log).catch(err=>{
        console.log('Connection Error')
        return res.json({
            "is_sent":false,
            "status":err.message
        })
      });

      return transporter.sendMail({
        from: `"Auto Spec Division" <${from}>`, // sender address
        to: to, // list of receivers
        
        subject: subject, // Subject line
        text:message, // plain text body
        
       
      })



}


router.post('/insert_booking',(req,res)=>{
    const customer_full_name = req.body.customer_full_name
    const customer_address = req.body.customer_address
    const phone_no = req.body.phone_no
    const car_make = req.body.car_make
    const car_year = req.body.car_year
    const car_model = req.body.car_model
    const car_name = req.body.car_name
    const email = req.body.email
    const message = req.body.message
    const requested_time = req.body.requested_time
    console.log(customer_full_name)
    const new_booking = new Booking({
        customer_full_name:customer_full_name,
        customer_address:customer_address,
        phone_no:phone_no,
        car_make:car_make,
        car_year:car_year,
        car_model:car_model,
        car_name:car_name,
        email:email,
        message:message,
        requested_time:requested_time
    })

    new_booking.save()

    return res.json({
        "is_added":true,
        "status":"Inserted Successfully"
    })



})


router.post('/change_status_of_booking',async(req,res)=>{
    const booking_id = req.body.booking_id
    const booking = await Booking.findById(booking_id)
    const status = req.body.status
    const filterDoc = {_id: booking_id}
    const updateDoc = {
        $set:{
            status: status,
        }
    }
    console.log(booking.email)
    
    Booking.updateMany(filterDoc, updateDoc)
    .then(()=>{
       
        send_mail(status,booking.email,booking.car_name,booking.requested_time)
        return res.json({
            "status":`success fully ${status} booking`,
            "is_success":true
        })
    })
    .catch(err=>{
        return res.json({
            "status":err.message,
            "is_success":false
        })
    })

    

})


router.get('/get_booking_by_id',async(req,res)=>{
    const booking_id = req.query.booking_id
    const booking = await Booking.findById(booking_id)
    return res.json({
        "data":booking
    })
})


router.get('/get_all_booking',(req,res)=>{
    Booking.find()
    .then(data=>{
        res.json({
            "data":data,
            "status":"success"
        })
    })
 
    
})

module.exports = router