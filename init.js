const mongoose=require("mongoose");
const Chat = require("./models/chat.js");
main().then(()=> {
    console.log("connection successful");

})
    .catch((err)=> console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[{
    from: "neha",
    to:"priya",
    message: "send me contact details",
    created_at: new Date(),
},
{
    from: "priya",
    to:"neha",
    message: "take my contact details 45882389230",
    created_at: new Date(),
},
{
    from: "supriya",
    to:"sukesh",
    message: "can we meet tommo",
    created_at: new Date(),
},
{
    from: "arman",
    to:"ani",
    message: "when is the meet",
    created_at: new Date(),
},
{
    from: "Ani",
    to:"armaan",
    message: "Join the meet",
    created_at: new Date(),
},
]
Chat.insertMany(allchats);