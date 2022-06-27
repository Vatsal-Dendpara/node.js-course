const lang = document.getElementById("lang");
const forks = document.getElementById("forks");
const stargazers = document.getElementById("stargazers");
let output = document.getElementById("output");
const submit = document.getElementById("submit");

//submit request to express server
submit.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(
    "/repo?lang=" +
      lang.value +
      "&" +
      "forks=" +
      forks.value +
      "&" +
      "stargazers_count=" +
      stargazers.value
  )
    .then((response) => response.json())
    .then((d) => {
      output.innerHTML = "File Downloaded";
      console.log(d);
    });
});
