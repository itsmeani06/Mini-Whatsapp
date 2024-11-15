const express = require("express");
const app= express();
const mongoose=require("mongoose");
const path=require("path");
const Chat = require("./models/chat.js");
app.set("views",path.join(__dirname,"views"));
app.set("view enginer","ejs");
app.use(express.static(path.join(__dirname, "public")));
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
    console.log(chats);
    res.render("index.ejs",{chats});
});

//for defining routes
app.get("/", (req,res)=>{
    res.send("root is working");
});
app.listen(8080,()=>{
    console.log("server is listening on 8080 ");
});