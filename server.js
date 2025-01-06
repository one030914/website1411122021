//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");


//web root
server.use(express.static(__dirname+"A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


var DB = require("nedb-promises");
var WorksDB = DB.create(__dirname+"/works.db");

WorksDB.insert([
    { modal: "#work1", imgSrc: "A/pic/OC復健.png",text:"小馬模板-Sunshine Lollipop" },
    { modal: "#work2", imgSrc: "A/pic/克羅利.png",text:"小馬模板-克羅利" },
    { modal: "#work3", imgSrc: "A/pic/麒麟.png",text:"小馬模板-熾燐玥" }
]).then(() => {
    console.log("初始化資料OK");
}).catch(err => {
    console.error("初始化資料失敗", err);
});

server.get("/works", (req,res)=>{
      //DB
      WorksDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})



server.listen(3000, ()=>{
    console.log("Server is running at port 3000.");
})




