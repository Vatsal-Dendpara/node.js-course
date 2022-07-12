const socket = io();
const sendMsg = document.getElementById("inc");
const locationBtn = document.getElementById("location");
const $messages = document.getElementById("messages");

const messageTemplate = document.getElementById("message-template").innerHTML;
const locationTemplate = document.getElementById("location-template").innerHTML;

socket.on("message", (msg) => {
  console.log(msg);
  const html = Mustache.render(messageTemplate, {
    message: msg.text,
    createdAt: moment(msg.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationTemplate, {
    url: url.text,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

const chat = document.getElementById("chatbox");
sendMsg.addEventListener("click", () => {
  const texts = chat.value;
  sendMsg.setAttribute("disabled", true);

  socket.emit("sendMessage", texts, (error) => {
    sendMsg.removeAttribute("disabled");
    chat.focus();
    chat.value = "";

    if (error) return console.log(error);

    console.log("Message Delivered");
  });
});

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported to your browser");
  }

  locationBtn.setAttribute("disabled", true);
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (error) => {
        if (error) return console.log(error);

        console.log("Location shared");
        locationBtn.removeAttribute("disabled");
      }
    );
  });
});
