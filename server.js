//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");

//web root
server.use(express.static(__dirname+"/A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 
 ProfolioDB.insert([
     { imgSrc: "modalroundicons.png" },
     { imgSrc: "startup-framework.png" },
     { imgSrc: "treehouse.png" },
     { imgSrc: "roundicons.png" },
     { imgSrc: "startup-framework.png" },
     { imgSrc: "treehouse.png" }
 ])

server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce"},
        {icon: "fa-laptop", heading:"Responsive Design"}
    ];
    res.send(Services);
});

server.get("/profolio", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.send("OK");
})

server.listen(80, ()=>{
    console.log("Server is running at port 80.");
})