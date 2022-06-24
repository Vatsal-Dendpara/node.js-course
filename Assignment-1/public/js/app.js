const lang = document.getElementById("lang");
const forks = document.getElementById("forks");
let output = document.getElementById("output");
const submit = document.getElementById("submit");
const getRepoData = require("./utils/getRepoData");

submit.addEventListener("click", (e) => {
  e.preventDefault();
});
