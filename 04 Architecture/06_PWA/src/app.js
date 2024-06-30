const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/public");

app.listen(port, () => console.log(`Listening on port ${port}!`));
