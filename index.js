const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.end("hello everyone");
})

let posts=[
    {
        id:uuidv4(),
        username:"Druv",
        content:"pending"
    },
    {
        id:uuidv4(),
        username:"Vivekan",
        content:"blogging"
    },
    {
        id:uuidv4(),
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
    let id=uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts");
    // res.send("post request received");
    // console.log(req.body);
    // res.send("Data is received..");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    // console.log(post);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    console.log(id);
    res.send("patch is working");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs");
});


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});