const submit = document.getElementById("submit");
let loc = document.getElementById("location");
let res = document.getElementById("output");
let forecast = document.getElementById("forecast");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  res.innerHTML = "Please Wait...";
  forecast.innerHTML = "";
  fetch("/weather?search=" + loc.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        res.innerHTML = data.error;
      } else {
        res.innerHTML = data.location;
        forecast.innerHTML = data.forecast;
      }
    });
  });
});
