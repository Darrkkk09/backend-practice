require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const http = require('http');
const bcrpyt = require('bcrypt');
const pool = require('./db'); 
const server = http.createServer(app);
app.use(express.json());
 
 async function  hashpassword(pass){
    const salt = await bcrpyt.genSalt(10);
    const hashpass = await bcrpyt.hash(pass,salt);
    return hashpass;
}

 function jwttoken(secretkey){
    const token =  jwt.sign({username : 'Bob'},secretkey,{expiresIn:'1h'});
    return token
}


app.post('/login', async (req,res)=>{
    try {
        const {username,password} = req.body;
        if(username !== 'Bob' || password !== '12345'){
            return res.status(401).send('Invalid credentials');
        }
        const hashedpass = await hashpassword(password);
        res.json({message:'Login successful',hashedpass});
    } catch(err) {
        console.log(err)
    }
})

app.post('/signup', async (req,res) =>{
    try{
        const {email,pass} = req.body;
        if(!email || !pass){
            return res.status(400).send('Email and password are required');
        }
        const jsontoken = jwttoken('demo')
        const hashedpass = await hashpassword(pass);
        res.json({message:'Signup successful',
            token : jsontoken,
            email : email,
            password : hashedpass
        });
    }catch(err){
        console.error(err);
    }
})

server.listen(3000,()=>{
    console.log("http://localhost:3000");
})


