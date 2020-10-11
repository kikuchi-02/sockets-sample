import { dirname, join } from "path";

import _http from "http";
import express from "express";
import socketIo from "socket.io";

const app = express();
const port = 3000;
const http = new _http.Server(app);
const io = socketIo(http);

app.get("/", (req, res) => {
  res.sendFile(
    join(dirname(dirname(__dirname)), "src", "websocket", "index.html")
  );
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(`message: ${message}`);
    io.emit("message", message);
  });
});

http.listen(port, () => {
  console.log(`server listening on ${port}`);
});
