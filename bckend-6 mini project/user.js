const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Authent');
const user = mongoose.Schema({
    age : Number,
    username : String,
    email : String,
    password : String
});
module.exports = mongoose.model('user',user);
