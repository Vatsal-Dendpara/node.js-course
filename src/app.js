const request = require("postman-request");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const getRepoData = require("./utils/getRepoData");

//setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Assignment 1",
    name: "VatsaL",
  });
});

app.get("/repo", (req, res) => {
  getRepoData(req.query.lang, req.query.forks, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      data: data.map((chunk) => {
        return {
          name: chunk.name,
          description: chunk.description,
          html_url: chunk.html_url,
          forks: chunk.forks,
          watchers_count: chunk.watchers_count,
          stargazers_count: chunk.stargazers_count,
          forks_count: chunk.forks_count,
          language: chunk.language,
        };
      }),
    });
  });
});
app.listen(3000, () => {
  console.log("server is running");
});
