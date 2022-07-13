const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const Filter = require("bad-words");
const { genMessages, genLocationMessage } = require("../src/utils/messages");
const {
  getUser,
  addUser,
  removeUser,
  getUsersInRoom,
} = require("./utils/users");
const { emit } = require("process");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("new websocket connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit("message", genMessages("Admin", "Welcome"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        genMessages(user.username, `${user.username} has joined room`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (texts, callback) => {
    const filter = new Filter();
    const user = getUser(socket.id);

    if (filter.isProfane(texts)) return callback("Profanity is not alloawed");
    io.to(user.room).emit("message", genMessages(user.username, texts));
    callback();
  });

  socket.on("sendLocation", (position, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      genLocationMessage(
        user.username,
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        genMessages("Admin", `${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log("server is running on", port);
});
