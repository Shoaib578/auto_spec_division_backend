const mongoose = require('mongoose');
const create_admin = require('./create_admin')

function connect(){
    const uri = 'mongodb+srv://Shoaib:Games@cluster0.l1kjgqm.mongodb.net/'
    try{
        mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
        const connection = mongoose.connection;
        connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
        create_admin()
        })
    }catch(e){
        console.log(e);
    }
}

module.exports = connect()