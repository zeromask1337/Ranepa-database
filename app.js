require("dotenv").config();
const express = require("express");
const app = require("./req/requests");

//Database
const db = require("./config/database");

//Connecting to database
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

//Express
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}...`)
);
