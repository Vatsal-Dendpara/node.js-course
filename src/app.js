const request = require("postman-request");
const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const csvwriter = require("csv-writer");
const getRepoData = require("./utils/getRepoData");

const port = process.env.PORT || 3000;

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

//get data according to textboxes
app.get("/repo", (req, res) => {
  getRepoData(
    req.query.lang,
    req.query.forks,
    req.query.stargazers_count,
    (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      const fileData = data.map((chunk) => {
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
      });

      res.send({
        data: fileData,
      });
      // CSV conversion using csv-parser module
      const createCSVWriter = csvwriter.createObjectCsvWriter;
      const csvWriter = createCSVWriter({
        path: "./data.csv",
        header: [
          { id: "name", title: "NAME" },
          { id: "description", title: "DESCRIPTION" },
          { id: "html_url", title: "HTML_URL" },
          { id: "forks", title: "FORKS" },
          { id: "watchers_count", title: "WATCHERS_COUNT" },
          { id: "stargazers_count", title: "STARGAZERS_COUNT" },
          { id: "forks_count", title: "FORKS_COUNT" },
          { id: "language", title: "LANGUAGE" },
        ],
      });

      csvWriter.writeRecords(fileData).then(() => {
        console.log("done");
      });
    }
  );
});

app.listen(port, () => {
  console.log("server is running");
});
