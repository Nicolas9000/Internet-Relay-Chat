const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    
    console.log(`User connected: ${socket.id}`)
    socket.on("disconnect", () => {
        console.log(`User disconnect: ${socket.id}`)
    })
    
    socket.on("enter_room", (room) => {
        socket.join(room)
        // console.log(socket.rooms);
        console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });
    
    socket.on("leave_room", (room) => {
        socket.leave(room)
    });
    
    socket.on("send", (msg) => {
        console.log(msg.room + " " + msg.message);
        socket.to(msg.room).emit("receive", msg);
    })

})

server.listen(3001, () => {
    console.log("SERVER : 3001");
})