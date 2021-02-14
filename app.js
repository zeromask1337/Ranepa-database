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
async function dbConnect() {
    try {
        await db
            .authenticate()
            .then(() => console.log("Database connected..."));
        await db.sync().then(console.log("Synced")); //Synchronize models
    } catch (err) {
        console.error(err);
    }
}

//Express server
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}...`)
);
dbConnect();
