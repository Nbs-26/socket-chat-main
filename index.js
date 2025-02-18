const http = require('node:http');
const express=require('express');
const path=require('node:path');
const { Server } = require('socket.io');
const port=3000;

//Create an express application
const app=express();
//Create a HTTP Server
const server=http.createServer(app);
//Create a socket.io server mounted on the HTTP Server
const io=new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat-message',(msg)=>{
        // console.log("Message : "+msg);
        io.emit('chat-msg',msg);
    })

    socket.on('acknowledge',(arg1,arg2,callback)=>{
        console.log(arg1);
        console.log(arg2);
        callback(
            {status:'Acknowledged'}
        );
    })
})    



server.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})