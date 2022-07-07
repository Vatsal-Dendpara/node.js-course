const app = require("./app");
const port = process.env.PORT;
process.env.TZ = "America/Chicago";
app.listen(port, () => {
  console.log("server is running on port ", port);
});
