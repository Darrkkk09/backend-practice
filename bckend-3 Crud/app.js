const express = require('express');
const app = express();
const mongo = require('./mongodb.js');
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.get('/create',async (req,res)=>{
    const user = await mongo.create({
        age : 16,
        name : 'prime',
        email : 'ranjit23@gmail.com',
    })
    res.send(user);
})
app.get('/update',async (req,res)=>{
    const user = await mongo.findOneAndUpdate({age : 16},{name: "DARKKKKPRIME"},{new : true});
    res.send(user);
})
app.get('/read',async (req,res)=>{
    const user = await mongo.findOne();
    res.send(user);
})
app.get('/delete',async (req,res)=>{
    const user = await mongo.findOneAndDelete({name: 'dark'});
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});