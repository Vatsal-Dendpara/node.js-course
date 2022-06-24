// -> Async basics.

// console.log("start");

// setTimeout(() => {
//   console.log("2 seconds delay");
// }, 2000);

// setTimeout(() => {
//   console.log("0 seconds delay");
// }, 0);
// console.log("stop");

//-> Making HTTP Request

const request = require("postman-request");
const forecast = require("./utils/forecast");
const checkWeatherForCity = require("./utils/geocode");
const getLatLong = (city) => {
  request(
    {
      url:
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(city) +
        ".json?access_token=pk.eyJ1IjoidmF0c2FsLTEyIiwiYSI6ImNsNHBjaGx6MjAwaGkzam84MTJhZzliMXIifQ.3KsBYzU483rgXRof8bSMDA&limit=1",
      json: true,
    },
    (error, response, { features }) => {
      if (error) {
        console.log("Unable to connect mapbox api.");
      } else if (features.length === 0) {
        console.log("unable to find location");
      } else {
        console.log(response.statusCode);
        console.log(features[0].place_name);
        console.log(features[0].center[0], features[0].center[1]);
        checkWeatherForCity(features[0].center[1], features[0].center[0]);
      }
    }
  );
};

if (process.argv.length === 2) {
  console.log("please provide an city");
} else {
  getLatLong(process.argv[2]);
}

// forecast("22.305199", 70.802833, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });
