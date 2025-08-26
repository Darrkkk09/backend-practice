const express = require('express')
const http = require('http')
const app = express()

const server = http.createServer(app)

app.use(express.json())

app.get('/products',(req,res)=>{
    try{
    const product = Array.from({length:100},(_,i)=>({ id : i+1,name : `product ${i+1}`}))
    const {page,limit} = req.query
    if(!page || !limit) {
        return res.status(400).send('Page and limit query parameters are required')
    }
    if(page > product.length){
        res.status(404).send('Page not found')
    }
    const p = parseInt(page) || 1
    const l = parseInt(limit) || 10
    const stidx = (p-1) * l
    const endidx = stidx + l
    const result = product.slice(stidx,endidx)
    res.json({
        page:p,
        limit:l,
        total: product.length,
        slicedData : result
    })
    } catch (error) {
        console.error(error);
    }
})


server.listen(3000,()=>{
    console.log('http://localhost:3000')
})