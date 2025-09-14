const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));



// -----------Decrypt the Password----------------------


// app.get('/',(req,res)=>{
//     bcrypt.genSalt((err,salt)=>{
//         bcrypt.hash('Darkk',salt,(err,hash)=>{
//             console.log(hash);
//             res.send(hash);
//         });
//     });
// });


// ----------Encrypt the Password----------------------
// app.get('/',(req,res)=>{
//     bcrypt.compare('Darkk','$2b$10$1Cn9YSIeJwpT2rAoEiD5EOwr0zatVj0mxQYb80iHTvPYgCtLE2qBm',(err,result)=>{
//         console.log(result);
//         res.send(result);
//     });
// });
// app.listen(3000);


// ----------Comparing The Encrpytion with the decrpytion----------------------




// app.get('/',(req,res)=>{
//     bcrypt.compare('Darkk','$2b$10$1Cn9YSIeJwpT2rAoEiD5EOwr0zatVj0mxQYb80iHTvPYgCtLE2qBm',(err,result)=>{
//         console.log(result);
//         res.send(result);
//     });
// });

// ---------------JWT Token And Creating IT----------------------
app.get('/',(req,res)=>{
    const token = jwt.sign({email : "dark@example.com"},'Darkk',function(err,token){
    if(err){
        console.log(err);
    }
    console.log(token);
    res.cookie('token',token);
    res.send("Cookie Set");
    });
    
});
// ----------------------Verifing The JWT Token With the Actual Unique Token
//   And also Comparing THem Give A Boolean----------------------
//  app.listen(3000);


// app.get('/read',(req,res)=>{
//     let verifiedData =    jwt.verify(req.cookies.token,'Darkk');
//         res.send(verifiedData);    
//         console.log(verifiedData);
// });
app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view-engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.send("Hello");
})
app.listen(9000);