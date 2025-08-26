const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("hello");
});

let id = 0;
let data = [];

// Add new data
app.post("/data", (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ message: "name and age required" });
    }

    const newdata = {
      message: "data added succesfully",
      id: ++id,
      name,
      age,
    };
    data.push(newdata);
    res.json(newdata);
  } catch (err) {
    console.log(err);
  }
});

// Get all data
app.get("/getalldata", (req, res) => {
  try {
    const allData = {
      message: "data fetched",
      data: data,
    };
    res.json(allData);
  } catch (err) {
    console.log(err);
  }
});

app.post("/data/:id", (req, res) => {
  try {
    const { id } = req.params;
    for (let i = 0; i < data.length; i++) {
      if (id == data[i].id) {
        data[i].name = "updated";
        data[i].age = 200;
        return res.json({
          message: "data updated",
          updatedData: data[i],
        });
      }
    }
    res.status(404).json({ message: "id not found" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete/:id",(req,res)=>{
    try{
        const {id} = req.params;
        const idnum = parseInt(id);
        const updatedata = data.filter((i)=> i.id !== idnum );
        data = updatedata;
        const you = {
                message : "data deleted",
                data : data
            }
            res.json(you);

    } catch(err){
        console.log(err);
    }
})

server.listen(3000, () => console.log("http://localhost:3000"));
