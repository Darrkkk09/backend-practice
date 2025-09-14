const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render("main.ejs");
})
app.listen(8080,function(){
    console.log("APP IS RUNNING at port 8080");
})