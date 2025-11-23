const mongoose = require('mongoose')
const { type } = require('os')

const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
});

const user_model=mongoose.model("user",user);

module.exports = user_model;