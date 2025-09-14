const mongoose = require('mongoose');
const user = require('./user');
mongoose.connect('mongodb://localhost:27017/mydatabase');
const post = mongoose.Schema({
    postData : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Date : {
        type: Date,
        default: Date.now
    },

});