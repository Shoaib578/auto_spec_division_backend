const express = require('express')
const app = express()



const cors = require('cors');
app.use(express.static("public"));
app.use(cors());
const nodemailer = require('nodemailer');


app.use(express.json());

require('./config/connection')



app.post('/send_mail',(req,res)=>{
    const subject = req.body.subject
    const from = req.body.from
    const message = req.body.message
    const full_name = req.body.full_name
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

      transporter.sendMail({
        from: `"${full_name}" <${from}>`, // sender address
        to: 'theshoaibihsan9@gmail.com', // list of receivers
        
        subject: subject, // Subject line
        text:message, // plain text body
        
       
      }).then(info => {
        res.json({
            "is_sent":true,
            
            "status":"Message Sent Successfully"
        })
      }).catch(err=>{
        res.json({
            "is_sent":false,

            "status":err.message
        })
      });
})

const booking = require('./src/routes/booking')
app.use('/apis/booking',booking)

const user = require('./src/routes/user');
app.use('/apis/user',user)

const car = require('./src/routes/car')
app.use('/apis/car',car)

const unavailable_days = require('./src/routes/unavailable_days')
app.use('/apis/unavailable_days',unavailable_days)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Listening on port "+PORT)
})