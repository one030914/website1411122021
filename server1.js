var express = require("express");
var server = express();
var bodyParser = require("body-parser");


var DB = require("nedb-promises");
var PaintingsDB = DB.create(__dirname + "/paintings.db");
var ProjectsDB = DB.create(__dirname + "/projects.db");


server.use(express.static(__dirname + "/A"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


async function initializeDatabases() {

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


initializeDatabases().catch((err) => console.error("Error initializing databases:", err));


server.get("/paintings", (req, res) => {
    PaintingsDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});


server.get("/projects", (req, res) => {
    ProjectsDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!");
        }
    });
});


server.post("/contact_me", (req, res) => {
    ContactDB.insert(req.body);
    res.send("OK");
});


server.listen(80, () => {
    console.log("Server is running at port 80.");
});
