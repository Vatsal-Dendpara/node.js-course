const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const request = require("postman-request");
const forecast = require("./utils/forecast");

const app = express();

//setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "VatsaL",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "must provide search term",
    });
  }

  geocode(req.query.search, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(lat, long, (error, castData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: castData,
        location,
        address: req.query.search,
      });
    });
  });

  // res.send({
  //   forecast: "Rainy",
  //   location: "Rajkot",
  //   address: req.query.search,
  // });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "VatsaL",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "how can i help you?",
    title: "Help",
    name: "VatsaL",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help artical not found",
    title: "404",
    name: "VatsaL",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404 not found",
    title: "404",
    name: "VatsaL",
  });
});
// app.get("/help", (req, res) => {
//   res.send("help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
