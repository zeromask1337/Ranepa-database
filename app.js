const express = require("express");
const sql = require("mysql");

const app = express();

app.use(express.static("public"));

app.listen(3000, () => console.log("Server started..."));
