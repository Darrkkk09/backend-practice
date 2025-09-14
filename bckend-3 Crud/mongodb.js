const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodbpratice');
const userScheema = mongoose.Schema({
    age : Number,
    name : String,
    email : String,
})
module.exports = mongoose.model('user',userScheema);