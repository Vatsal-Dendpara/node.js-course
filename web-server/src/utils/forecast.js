const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bf2e1c67b578e4d7fa23c2cfe50cee89&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out." +
          " It feels like " +
          body.current.feelslike +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
