// server.js
let pitch1 = 0;
let roll1 = 0;
// document.getElementById("pitch").value = pitch;
const canva = document.getElementById("canvas");
const ctx = canva.getContext("2d");
let divClientWidth = document.getElementById("container").clientWidth;
console.log(divClientWidth);
let divClientHeight = document.getElementById("container").clientHeight;
console.log(divClientHeight);
let width = divClientWidth;
let height = divClientHeight;


canvas.height = height
canvas.width = width;
let pitchArray = [];
let rollArray = [];
// let yaw = 0;
// let yawArray = [];
// let accelX = 0;
// let accelXArray = [];
// let accelY = 0;
// let accelYArray = [];
// let accelZ = 0;
// let accelZArray = [];
let a1 = false;
// let b = false;
// let ab = false;
const sampleSize = 10;
const centerX = width / 2;
const centerY = height / 2;
// const radius = 10;
// const lineWidth = 5;
// const lineLength = 50;
// const lineColor = "black";
// const circleColor = "black";
// const circleFillColor = "white";
// const circleRadius = 10;
// const circleLineWidth = 2;
let positionX1 = centerX;
let positionY1 = centerY;
console.log("Hello Worldaaaaa");
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
          arrayPitchPushValues(num, pitchArray, sampleSize);
          pitch1 = mostFrequent(pitchArray, pitchArray.length);
          console.log(`pitch: ${pitch}`);
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
          arrayRollPushValues(num, rollArray, sampleSize);
          roll1 = mostFrequent(rollArray, rollArray.length);
          console.log(`roll: ${roll}`);
        }
      } else {
        console.log("Not a valid Roll");
      }
    } else if (data.indexOf("a") === 0) {
        a1 = true;
        setTimeout(() => {
          // console.log("Delayed for 0.5 second.");
          a1 = false;
        }, "500");
      }
  }
}
function processData2(data) {
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
          pitch1= num;
          console.log(`pitch: ${pitch1}`);
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
          roll1 = num;
          console.log(`roll: ${roll1}`);
        }
      } else {
        console.log("Not a valid Roll");
      }
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
  pitchArray = arr;
}
function arrayRollPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
  rollArray = arr;
}
function arrayYawPushValues(num, arr, sample) {
  if (arr.length > sample) {
    arr.pop();
    arr.unshift(num);
  } else {
    arr.unshift(num);
  }
  // console.log(arr)
  yawArray = arr;
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
  processData2(value);
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
    draw();
}
function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

function draw() {
    if (!painting) return;
    document.getElementById("pitch1").value = pitch1;
    document.getElementById("roll1").value = roll1;
    document.getElementById("positionX1").value = positionX1.toFixed(2);
    document.getElementById("positionY1").value = positionY1.toFixed(2);
    positionX1 = setPositionX1(positionX1);
    positionY1 = setPositionY1(positionY1);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';

    ctx.lineTo(positionX1, positionY1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(positionX1, positionY1);
    // console.log('Y = '+e.clientY+' X = '+e.clientX);
}
function pointer() {
    // if (!painting) return;
    document.getElementById("pitch1").value = pitch1;
    document.getElementById("roll1").value = roll1;
    document.getElementById("positionX1").value = positionX1.toFixed(2);
    document.getElementById("positionY1").value = positionY1.toFixed(2);
    positionX1 = setPositionX1(positionX1);
    positionY1 = setPositionY1(positionY1);
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';

    ctx.lineTo(positionX1, positionY1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(positionX1, positionY1);
    // console.log('Y = '+e.clientY+' X = '+e.clientX);
}
function draw1() {
  document.getElementById("pitch1").value = pitch1;
  document.getElementById("roll1").value = roll1;
  document.getElementById("positionX1").value = positionX1.toFixed(2);
  document.getElementById("positionY1").value = positionY1.toFixed(2);
  positionX1 = setPositionX1(positionX1);
  positionY1 = setPositionY1(positionY1);
  // console.log("draw")

  // ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(positionX1, positionY1, circleRadius, 0, 2 * Math.PI);
  ctx.lineWidth = circleLineWidth;
  // ctx.strokeStyle = circleColor;
  ctx.strokeStyle = getRandomColor();
  ctx.stroke();
  // ctx.fillStyle = circleFillColor;
  ctx.fillStyle = getRandomColor();
  ctx.fill();
}
function setPositionX1(x) {
  if (x > width) {
    x = width - 10;
  } else if (x < 10) {
    x = 10;
  } else {
    x = x + (roll1 / 100);
  }
  return x;
}
function setPositionY1(y) {
  if (y > height) {
    y = height - 10;
  } else if (y < 10) {
    y = 10;
  } else {
    y = y + (pitch1/ 100);
  }
  return y;
}
function writeText() {
  beginPath();
  ctx.font = "30px Arial";
  ctx.fillText(`${pitch}`, centerX, centerY);
}
setInterval(draw,pointer, writeText, 100);

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = divClientWidth;
})
