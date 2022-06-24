const request = require("postman-request");
let url = "";
const getRepoData = (lang, forks = 0, callback) => {
  if (lang == null) {
    url = "https://api.github.com/search/repositories?q=is:public";
  } else {
    url =
      "https://api.github.com/search/repositories?q=is:public+language:" + lang;
  }
  request(
    {
      url: url,
      json: true,
      headers: {
        "user-agent": "app.js",
      },
    },
    (error, { body }) => {
      if (error) {
        callback("unable to connect to the api.", undefined);
      } else if (body.items.length === 0) {
        callback("unable to find data", undefined);
      } else {
        const repos = body.items.filter((repo) => {
          return repo.forks >= forks && repo.stargazers_count > 2000;
        });

        callback(undefined, repos);
      }
    }
  );
};

module.exports = getRepoData;
