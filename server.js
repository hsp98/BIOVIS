const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/biovis/build/"));

app.get("/*", function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "biovis", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, function () {
  console.log("started ");
});
