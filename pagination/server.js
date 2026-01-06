const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello WOrld");
})
app.get("/pagination",(req,res)=>{

    const {page,limit} = req.query;


    const pageNumber = parseInt(page) || 1;
    const limitNumber  = parseInt(limit) || 5;
    const p = (pageNumber - 1) * limitNumber;
    const data = [];
    for(let i=1;i<101;i++){
        data.push({
            "id":i,
            "name" : `Item ${i}`,
        })
    }
    return res.json({
        page : pageNumber,
        limit : limitNumber,
        data : data.slice(p,p+limitNumber),
    })

})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});