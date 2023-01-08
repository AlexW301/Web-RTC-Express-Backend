const express = require("express");
const app = express();
const port = 3001;
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-discconnected", userId);
    });
  });
});

server.listen(port)
