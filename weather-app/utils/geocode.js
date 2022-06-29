const request = require("postman-request");

const checkWeatherForCity = (lat, long) => {
  request(
    {
      url:
        "http://api.weatherstack.com/current?access_key=bf2e1c67b578e4d7fa23c2cfe50cee89&query=" +
        lat +
        "," +
        long,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        console.log("Unable to connect weatherstack api.");
      } else if (body.error) {
        console.log("unable to find city.");
      } else {
        console.log(
          body.current.weather_descriptions[0] +
            ". It is currently " +
            body.current.temperature +
            " degress out." +
            " It feels like " +
            body.current.feelslike +
            " degress out."
        );
      }
    }
  );
};

module.exports = checkWeatherForCity;
