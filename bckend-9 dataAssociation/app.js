const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const postModel = require('./models/post');
const user = require('./models/user');


app.get("/",(req,res)=>{
    res.send("page");
    
})
app.get("/create",async (req,res)=>{
    let  user =  await userModel.create({
        name: "John",
        email: "johnnnnn@gmail.com",
        age: 30,
        posts : []
    });
    res.send(user);
})
app.get("/post/create",async (req,res)=>{
    let user = await userModel.findOne({ name: "John" });
    let post = await postModel.create({
        postData: "PostData Example",
        user: user._id,
    })
    user.posts.push(post._id);
    await user.save();
    res.send(post);
})



app.listen(3000,()=>{
    console.log("http://localhost:3000");
});