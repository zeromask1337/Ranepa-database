const express = require("express");
const sql = require("mysql");

const app = express();

app.use(express.static("public"));

app.listen(3000, () => console.log("Server started..."));

app.get("/officedev-spec", (req, res) =>
    req.query.dev === "designer" && req.query.lvl === "junior"
        ? res.send("Success")
        : res.send("failure")
);

app.get("/office_list", (req, res) => res.send(req.query));
app.get("/office_workers_count", (req, res) => res.send(req.query));
app.get("/office_dev_workers_count", (req, res) => res.send(req.query));
app.get("/office_dev_workers_spec_count", (req, res) => res.send(req.query));
app.get("/dev_project_count_sort", (req, res) => res.send(req.query));
app.get("/office_workers_range_date_list", (req, res) => res.send(req.query));
app.get("/project_dev_point_list", (req, res) => res.send(req.query));
app.get("/project_price_range_list", (req, res) => res.send(req.query));
app.get("/project_price_list_sort", (req, res) => res.send(req.query));
app.get("/project_client_point_list", (req, res) => res.send(req.query));
app.get("/client_list_10", (req, res) => res.send(req.query));
app.get("/client_cashAmount_list_sort", (req, res) => res.send(req.query));
