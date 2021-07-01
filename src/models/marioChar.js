const mongoose = require('mongoose');

//  Your code goes here
const marioM= new mongoose.Schema({
    name:{type:String},
    weight:{type:Number}
})


const marioModel = new mongoose.model('marioModel', marioM);
module.exports = marioModel;