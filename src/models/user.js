const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    is_admin:{type:Boolean,default:false}

})

const User = mongoose.model("User", UserSchema)
module.exports = User