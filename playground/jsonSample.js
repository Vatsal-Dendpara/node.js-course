const fs = require("fs");

const buffer = fs.readFileSync("1-json.json");
const json = buffer.toString();
const data = JSON.parse(json);
data.name = "john";
data.age = 30;
fs.writeFileSync("1-json.json", JSON.stringify(data));
