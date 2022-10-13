const socket = io();
const audio = new Audio("messenger_tone.mp3");

var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value, user);
    append(input.value, "right");
    input.value = "";
  }
});
const user = prompt("Enter your name");
socket.emit("new-user", user);
const container = document.getElementById("container");
const append = (msg, position) => {
  let left = document.createElement("div");
  left.classList.add("bothrl");
  left.classList.add(position);
  left.innerText = msg;
  container.appendChild(left);
  
};

socket.on("user-joined", (data) => {
  if (data) {
    append(`${data} joined the chat`, "left");
    audio.play();
  }
});

socket.on("msg", (msg, user) => {
  append(`${user}: ${msg}`, "left");
  audio.play();
});
