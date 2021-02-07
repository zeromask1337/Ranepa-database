require("dotenv").config();
const {
    Clients,
    Developer,
    Employees,
    Office,
    Projects,
} = require("./models/models");
const express = require("express");
const app = require("./req/requests");

//Database
const db = require("./config/database");

//Connecting to database
db.authenticate()
    .then(() => console.log("Database connected..."))
    .then(db.sync().then(console.log("Synced")))
    .then(console.log("All offices " + Office))
    .catch((err) => console.log("Error: " + err));

//Synchronize modelsS

//Express
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}...`)
);
