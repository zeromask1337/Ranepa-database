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

async function findAnything() {
    try {
        const users = await Clients.findAll();
        console.log(users.every((user) => user instanceof Clients)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
    } catch (err) {
        console.error(err);
    }
}

//Express
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}...`)
);
dbConnect();
findAnything();
