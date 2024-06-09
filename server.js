const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
let cors = require("cors");
const app = express();
let server = require("http").Server(app);
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const porto = 8888;
// const server = createServer(app);
// const io = new Server(server);
let io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:8888"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/public/index.html"));
});
app.use(express.static(__dirname + "/public"));

// Serial port
// MACBOOK PORT FOR MICROBIT
// to check for the port number in mac:
// open a Terminal window, type ls /dev/tty.usb*, and press enter.
// let port = new SerialPort('/dev/tty.usbmodem14202', {
// WINDOWS PORT FOR MICROBIT
// to check the COMXX number look at device manager
let port = new SerialPort("COM8", {
  // let port = new SerialPort('/dev/tty.usbmodem14202', {
  baudRate: 115200,
  // baudRate: 1200,
  // autoOpen: false,
});

// The Serial port parser
const parser = new Readline();
port.pipe(parser);

// Read the data from the serial port
// parser.on("data", (line) => console.log(`Line: ${line}`));
port.open(() => {
  console.log("Port open");
  parser.on("data", (data) => {
    // console.log('Received Data: ' + data.toString());
    console.log(data);
    io.emit("serialData", data.toString());

    //   processData(data);
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(porto, () => {
  console.log(`server running at http://localhost:${porto}`);
});
