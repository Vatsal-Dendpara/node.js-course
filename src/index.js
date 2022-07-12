const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const Filter = require("bad-words");
const { genMessages, genLocationMessage } = require("../src/utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("new websocket connection");

  socket.emit("message", genMessages("Welcome"));
  socket.broadcast.emit("message", genMessages("A new user has joined"));

  socket.on("sendMessage", (texts, callback) => {
    const filter = new Filter();
    if (filter.isProfane(texts)) return callback("Profanity is not alloawed");
    io.emit("message", genMessages(texts));
    callback();
  });

  socket.on("sendLocation", (position, callback) => {
    io.emit(
      "locationMessage",
      genLocationMessage(
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", genMessages("A user has left"));
  });
});

server.listen(port, () => {
  console.log("server is running on", port);
});
