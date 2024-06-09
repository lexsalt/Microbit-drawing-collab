// server.js
let pitch1 = 0;
let roll1 = 0;
let yaw1 = 0;

const canva = document.getElementById("canvas");
const canva2 = document.getElementById("canvas2");
const ctx = canva.getContext("2d");
const ctx2 = canva2.getContext("2d");

let divClientWidth = document.getElementById("container").clientWidth;
console.log(divClientWidth);
let divClientHeight = document.getElementById("container").clientHeight;
console.log(divClientHeight);
let width = divClientWidth;
let height = divClientHeight;

canvas.height = height;
canvas.width = width;
canva2.height = height;
canva2.width = width;

let pitch1Array = [];
let roll1Array = [];
let yaw1Array = [];
let a1 = false;
const sampleSize = 10;
const centerX = width / 2;
const start1X = centerX / 2;
const centerY = height / 2;
let positionX1 = start1X;
let positionY1 = centerY;

const socket = io();

function processData(data) {
  let checkData = Number(data);
  if (checkNum(checkData)) {
    // console.log(`data is a number: ${data}`);
  } else {
    if (data.indexOf("p") === 0) {
      // console.log(typeof(data))
      let arr = data.split("");
      if (arr[0] === "p") {
        arr.shift();
        let str = arr.join("");
        let num = Number(str);
        // console.log(num)
        // console.log(str)
        // console.log(arr)
        if (!checkNum(num)) {
          // console.log(num);
        } else if (checkNum(num)) {
          // arrayPitchPushValues(num, pitch1Array, sampleSize);
          // pitch1 = mostFrequent(pitch1Array, pitch1Array.length);
          pitch1 = num;
          // console.log(`pitch: ${pitch1}`);
        }
      } else {
        console.log("Not a valid Pitch");
      }
      // console.log(arr)
      // console.log(data)
    } else if (data.indexOf("r") === 0) {
      let arr = data.split("");
      if (arr[0] === "r") {
        arr.shift();
        let str = arr.join("");
        let num = Number(str);
        // console.log(num)
        // console.log(str)
        // console.log(arr)
        if (!checkNum(num)) {
          // console.log(num);
        } else if (checkNum(num)) {
          // arrayRollPushValues(num, roll1Array, sampleSize);
          // roll1 = mostFrequent(roll1Array, roll1Array.length);
          roll1 = num;
          // console.log(`roll: ${roll1}`);
        }
      } else {
        console.log("Not a valid Roll");
      }
    } else if (data.indexOf("y") === 0) {
      let arr = data.split("");
      if (arr[0] === "y") {
        arr.shift();
        let str = arr.join("");
        let num = Number(str);
        // console.log(num)
        // console.log(str)
        // console.log(arr)
        if (!checkNum(num)) {
          // console.log(num);
        } else if (checkNum(num)) {
          // arrayYawPushValues(num, yaw1Array, sampleSize);
          // yaw1 = mostFrequent(yaw1Array, yaw1Array.length);
          yaw1 = num;
          // console.log(`yaw: ${yaw1}`);
        }
      } else {
        console.log("Not a valid Roll");
      }
    } else if (data.indexOf("a") === 0) {
      a1 = true;
      setTimeout(() => {
        // console.log("Delayed for 0.5 second.");
        a1 = false;
      }, 500);
    }
  }
}

function checkNum(x) {
  if (isNaN(x)) {
    return false;
  }
  return true;
}
function arrayPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
}
function arrayPitchPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
  pitch1Array = arr;
}
function arrayRollPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
  roll1Array = arr;
}
function arrayYawPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
  yaw1Array = arr;
}
function mostFrequent(arr, n) {
  let maxcount = 0;
  let element_having_max_freq;
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (arr[i] === arr[j]) count++;
    }
    if (count > maxcount) {
      maxcount = count;
      element_having_max_freq = arr[i];
    }
  }
  return element_having_max_freq;
}
function onData(value) {
  processData(value);
  // console.log(value)
}
socket.on("serialData", onData);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// draw functions
// var painting = undefined; //draw variable
var painting = a1; //draw variable

function startPosition() {
  painting = true;
  draw1();
}
function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw1() {
  // if (!painting) return;
  // document.getElementById("pitch1").value = pitch1;
  // document.getElementById("roll1").value = roll1;
  // document.getElementById("positionX1").value = positionX1.toFixed(2);
  // document.getElementById("positionY1").value = positionY1.toFixed(2);

  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.lineTo(positionX1, positionY1);
  ctx.moveTo(positionX1, positionY1);
  ctx.stroke();
}

function pointer1() {
  positionX1 = setPositionX1(positionX1);
  positionY1 = setPositionY1(positionY1);
  ctx2.clearRect(0, 0, width, height);
  ctx2.beginPath();
  ctx2.lineColor = "red";
  ctx2.strokeStyle = "red";
  ctx2.moveTo(positionX1 + 5, positionY1 - 10);
  ctx2.lineTo(positionX1 + 20, positionY1 - 15);
  ctx2.lineTo(positionX1 + 5, positionY1 - 25);
  ctx2.lineTo(positionX1 + 5, positionY1 - 10);
  ctx2.fillStyle = "red";
  ctx2.fill();
  ctx2.stroke();
}

function text1() {
  ctx2.clearRect(0, 0, width, height);
  ctx2.lineWidth = 1;
  ctx2.strokeStyle = "white";
  ctx2.font = "bolder 12px Verdana";
  ctx2.fillStyle = "black";
  ctx2.strokeText("Player 1", positionX1 + 15, positionY1 - 25);
  ctx2.fillText("Player 1", positionX1 + 15, positionY1 - 25);
  ctx2.fill();
  ctx2.stroke();
}

function setPositionX1(x) {
  if (x > width) {
    x = width - 10;
  } else if (x < 10) {
    x = 10;
  } else {
    x = x + roll1 / 100;
  }
  return x;
}

function setPositionY1(y) {
  if (y > height) {
    y = height - 10;
  } else if (y < 10) {
    y = 10;
  } else {
    y = y + pitch1 / 100;
  }
  return y;
}

function execute() {
  pointer1();
  text1();
  if (a1) {
    draw1();
  }
  // pointer1();
  // draw1();
  // text1();
  // pointer2();
  // draw2();
  // text2();
}
setInterval(execute, 10);

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = divClientWidth;
});
