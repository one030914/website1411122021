var express = require("express");
var server = express();
var bodyParser = require("body-parser");

// 引入 NeDB 模块
var DB = require("nedb-promises");
var PaintingsDB = DB.create(__dirname + "/paintings.db");
var ProjectsDB = DB.create(__dirname + "/projects.db");

// 使用静态文件目录
server.use(express.static(__dirname + "/A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// 初始化数据
async function initializeDatabases() {
    // 初始化 Paintings 数据
    const paintings = await PaintingsDB.find({});
    if (paintings.length === 0) {
        await PaintingsDB.insert([
            { imgSrc: "OC復健.png"},
            { imgSrc: "克羅利.png"},
            { imgSrc: "麒麟.png"},
            { imgSrc: "001-1.jpg"},
            { imgSrc: "2024新年無字.png"},
            { imgSrc: "2024spooky month.png"}
        ]);
        console.log("Initial paintings data inserted.");
    } else {
        console.log("Paintings database already contains data.");
    }

    // 初始化 Projects 数据
    const projects = await ProjectsDB.find({});
    if (projects.length === 0) {
        await ProjectsDB.insert([
            { name: "KK project" , imgSrc: "OP.png",},
            { name: "My wrold", imgSrc: "魘.png",},
            { name: "Us" , imgSrc: "all.png",}
        ]);
        console.log("Initial projects data inserted.");
    } else {
        console.log("Projects database already contains data.");
    }
}

// 调用初始化函数
initializeDatabases().catch((err) => console.error("Error initializing databases:", err));

// 服务端点：获取 Paintings 数据
server.get("/paintings", (req, res) => {
    PaintingsDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});

// 服务端点：获取 Projects 数据
server.get("/projects", (req, res) => {
    ProjectsDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});

// 服务端点：提交联系方式数据
server.post("/contact_me", (req, res) => {
    ContactDB.insert(req.body);
    res.send("OK");
});

// 启动服务器
server.listen(80, () => {
    console.log("Server is running at port 80.");
});
