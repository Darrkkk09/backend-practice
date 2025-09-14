
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
      if (err) return res.status(500).send("Can't read files");
  
      const tasks = [];
  
      if (files.length === 0) return res.render("index", { files: [] });
  
      let count = 0;
  
      files.forEach((file) => {
        fs.readFile(`./files/${file}`, 'utf8', (err, data) => {
          tasks.push({ title: file, body: data });
          count++;
  
          if (count === files.length) {
            res.render("index", { files: tasks });
          }
        });
      });
    });
  });
  
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err) {
      if (err) throw err;
      console.log("File Created");
      res.redirect('/');
    });
  });
  
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});