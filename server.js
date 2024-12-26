//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var path = require("path");

//web root
server.use(express.static(__dirname+"/A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


var DB = require("nedb-promises");
var WorksDB = DB.create(__dirname+"/works.db");


// 檢查資料庫是否有資料，若無則初始化
WorksDB.find({}).then(results => {
    if (results.length === 0) {
        // 插入初始資料
        WorksDB.insert([
            { modal: "#work1", imgSrc: "2024spooky month.png",text:"小馬模板-Sunshine Lollipop" },
            { modal: "#work2", imgSrc: "cwtt32.png",text:"小馬模板-克羅利" },
            { modal: "#work3", imgSrc: "OC復健.png",text:"小馬模板-熾燐玥" }
        ]).then(() => {
            console.log("初始化資料OK");
        }).catch(err => {
            console.error("初始化資料失敗", err);
        });
    } else {
        console.log("資料庫已經有資料");
    }
}); 

// 提供 /works 路由，讓前端能夠獲取資料庫資料
server.get('/works', (req, res) => {  // 使用 server.get()
    WorksDB.find({}).then(results => {
        res.json(results);  // 返回 JSON 格式資料
    }).catch(err => {
        res.status(80).send('Error retrieving data from the database');
    });
});

// 提供靜態文件 (例如 HTML, CSS, JS)
server.use(express.static(path.join(__dirname, 'A')));


server.listen(80, ()=>{
    console.log("Server is running at port 80.");
})

/*
server.get("/works", (req,res)=>{
      //DB
      WorksDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})*/

// WorksDB.insert([
//     { modal: "#portfolioModal1", imgSrc: "modalroundicons.png", heading: "Round Icons", text: "Graphic Design" },
//     { modal: "#portfolioModal2", imgSrc: "startup-framework.png", heading: "Startup Framework", text: "Website Design" },
//     { modal: "#portfolioModal3", imgSrc: "treehouse.png", heading: "Treehouse", text: "Website Design" },
//     { modal: "#portfolioModal1", imgSrc: "roundicons.png", heading: "Round Icons", text: "Graphic Design" },
//     { modal: "#portfolioModal2", imgSrc: "startup-framework.png", heading: "Startup Framework", text: "Website Design" },
//     { modal: "#portfolioModal3", imgSrc: "treehouse.png", heading: "Treehouse", text: "Website Design" }
// ])