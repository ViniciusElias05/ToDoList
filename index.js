const express = require("express");
const app = express();
const connection = require("./database/database");
const List = require("./database/List");

app.set("view engine", "ejs")
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

connection
    .authenticate()
    .then(()=>{console.log("Conexão feita com sucesso!")})
    .catch(error =>{ console.log(error)})


app.get("/", (req,res)=>{
    List.findAll().then(list => {
        res.render("index", {list:list})
    })
})
app.post("/add/save", (req,res)=>{
   let task = req.body.task;

    if(task != undefined){
        List.create({
            task:task
        }).then(()=>{
            res.redirect("/")
        })
    }

})

app.post("/delete", (req,res) =>{
    let id =  req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            List.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/")
            })
        }else{
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
})
app.listen(8080)