const request = require("request");

const geocode = (search, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(search) +
    ".json?access_token=pk.eyJ1IjoidmF0c2FsLTEyIiwiYSI6ImNsNHBjaGx6MjAwaGkzam84MTJhZzliMXIifQ.3KsBYzU483rgXRof8bSMDA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
