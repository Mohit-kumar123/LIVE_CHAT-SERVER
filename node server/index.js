let express=require('express');
let app=express();
const port=8000;
var http=require("http").Server(app);
var io=require("socket.io")(http);

const path=require("path");
const mainfile=path.join(__dirname, "../")

app.use(express.static(mainfile));

app.get("/",function(req,res){
    res.sendFile(mainfile +"/index.html");
}) 

const activeusers={};
io.on("connection",(socket)=>{
    socket.on("new_user_joined",(username)=>{
        console.log("new user",username);
        activeusers[socket.id]=username;
        socket.broadcast.emit("user-joined",username)


        socket.on("disconnect",()=>{
            console.log("user-left",username);
            socket.broadcast.emit("user-left",username);
            // delete activeusers[socket.id];
        })


    })

    socket.on("send",(message)=>{
        // console.log(message);

        socket.broadcast.emit("recieve",{
            message : message,
            username : activeusers[socket.id]
        })
    })
})

http.listen(port,function(){
    console.log(`server is listening at port ${port}`)
})