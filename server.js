//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
const port = 3000;

//web root
server.use(express.static(__dirname + "/A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var DB = require("nedb-promises");
var indexDB = DB.create(__dirname + "/index.db");
var workDB = DB.create(__dirname + "/work.db");

// index.html db
const indexData = {
    paintings: [
        { imgSrc: "./pic/2024spooky month.png"},
        { imgSrc: "./pic/cwtt32.png"},
        { imgSrc: "./pic/OC復健.png"},
    ],
    projects:[
        { imgSrc: "./pic/OP.png"},
        { imgSrc: "./pic/llama.png"},
        { imgSrc: "./pic/魘.png"},
    ]
};

// indexDB
//     .insert(indexData)
//     .then(() => {
//         console.log("indexDB 初始化資料OK");
//     })
//     .catch((err) => {
//         console.error("indexDB 初始化資料失敗", err);
//     });

// work.html db
const workData = {
    paintings: [
        { imgSrc: "./pic/OC復健.png", text: "小馬模版-Sunshine Lollipop" },
        { imgSrc: "./pic/克羅利.png", text: "小馬模版-克羅利" },
        { imgSrc: "./pic/麒麟.png", text: "小馬模版-麒麟翔" },
    ],
    C1: [
        { imgSrc: "./pic/llama.png", text: "萬聖節合作繪圖-Llama" },
        { imgSrc: "./pic/water.png", text: "萬聖節合作繪圖-西瓜" },
        { imgSrc: "./pic/yue.png", text: "萬聖節合作繪圖-阿玥" },
    ],
    C2: [
        { imgSrc: "./pic/all.png", text: "角色設計課程成果-伊拉" },
        { imgSrc: "./pic/ball.png", text: "角色設計課程成果-比爾" },
        { imgSrc: "./pic/all2.png", text: "角色設計課程成果-碧月" },
    ],
    C3: [
        { imgSrc: "./pic/3pony1.png", text: "隨機關鍵字創角色-舒芙蕾/櫻桃/水手服" },
        { imgSrc: "./pic/3pony2.png", text: "隨機關鍵字創角色-火焰/兔耳/鐮刀" },
        { imgSrc: "./pic/3pony3.png", text: "隨機關鍵字創角色-蛇尾/菸斗/霧" },
    ],
};

// workDB
//     .insert(workData)
//     .then(() => {
//         console.log("workDB 初始化資料OK");
//     })
//     .catch((err) => {
//         console.error("workDB 初始化資料失敗", err);
//     });

server.get("/index", (req, res) => {
    //DB
    indexDB.find({}).then((results) => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});

server.get("/work", (req, res) => {
    //DB
    workDB.find({}).then((results) => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});

// start server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
