const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const saltRounds = 10

router.post('/register_user',(req,res)=>{
    const email = req.body.email
   
    User.findOne({email:email})
    .then(result=>{
        if(result){
            return res.json({
                "is_registered": false,
                "status":"email already registered.please try another one"

            })
        }else{
            const password = req.body.password
            const username = req.body.username
            bcrypt.hash(password,saltRounds, (error, hash) => {
            const new_user = new User({
                email:email,
                password:hash,
                username:username
            })
            new_user.save()
            return res.json({
                "is_registered": true,
                "user":new_user,
                "status":"user registered successfully"

            })
        })
        }
    })
})


router.post('/login_user',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    User.findOne({email:email})
    .then(result=>{
        if(result){
            console.log(result)
        bcrypt.compare(password, result.password,(error,response)=>{
            if(response == true){
                return res.json({
                    "is_loggedin":true,
                    "user":result,
                    "status":"Logged in successfully"
    
                })
            }else{
                return res.json({
                    "is_loggedin":false,
                    "status":"Invalid Email or Password"
                })
            }
        })

    }else{
        return res.json({
            "is_loggedin":false,
            "status":"Invalid Email or Password"
        })
    }

        
    })
})

module.exports = router