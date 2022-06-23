const http = require("http");
const url =
  "http://api.weatherstack.com/current?access_key=bf2e1c67b578e4d7fa23c2cfe50cee89&query=rajkot";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (c) => {
    data = data + c.toString();
  });

  response.on("end", () => {
    console.log(JSON.parse(data));
  });
});

request.on("error", (e) => {
  console.log("An error occurred", e);
});

request.end();
