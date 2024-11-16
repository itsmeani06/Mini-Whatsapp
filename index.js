const express = require("express");
const app= express();
const mongoose=require("mongoose");
const path=require("path");
const Chat = require("./models/chat.js");
const methodOverride= require("method-override");
app.set("views",path.join(__dirname,"views"));
app.set("view enginer","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//for database connection
main().then(()=> {
    console.log("connection successful");

})
    .catch((err)=> console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// //for adding new data to the schema in chat.js
// let chat1=new Chat({
//     from: "neha",
//     to:"priya",
//     message: "send me contact details",
//     created_at: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });


//index Route
app.get("/chats", async (req,res)=>{
    let chats= await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

//New message route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});


//Creation when clicking on the button in chats/new
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat= new Chat({
        from: from,
        to: to,
        message: msg,
        created_at: new Date()
    });
    newChat.save().then((res)=>{console.log("New chat was saved");}).catch((err)=>{console.log(err);});
    res.redirect("/chats");
});

//To edit the message
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params; 
    let{msg: newMsg}=req.body;
    let updatedchat= await Chat.findByIdAndUpdate(id,{message: newMsg},{runValidators:true, new: true});
    console.log(updatedchat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let deletionchat= await Chat.findByIdAndDelete(id);
    console.log(deletionchat);
    res.redirect("/chats");
})
//for defining routes
app.get("/", (req,res)=>{
    res.send("root is working");
});
app.listen(8080,()=>{
    console.log("server is listening on 8080 ");
});