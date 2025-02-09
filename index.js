const express=require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});

app.get("/",(req,res)=>{
    res.end("hello everyone");
})

let posts=[
    {
        id:1,
        username:"Druv",
        content:"pending"
    },
    {
        id:2,
        username:"Vivekan",
        content:"blogging"
    },
    {
        id:3,
        username:"Shraan",
        content:"Acting"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    posts.push({username,content});
    res.redirect("/posts");
    // res.send("post request received");
    // console.log(req.body);
    // res.send("Data is received..");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
});
