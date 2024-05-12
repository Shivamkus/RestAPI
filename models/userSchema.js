const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String,
        required:true,
    },

    email:{
        unique:true,
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },

    phone:{
        type:Number,
        required:true,
    },

    
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;