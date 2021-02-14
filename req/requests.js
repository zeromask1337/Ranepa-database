const express = require("express");
const app = express();
const db = require("../config/database");

//Sequelize
const sequelize = require("sequelize");
const { QueryTypes, Op } = require("sequelize");
const {
    Clients,
    Developer,
    Employees,
    Office,
    Projects,
} = require("../models/models");

//1. Выдать список всех офисов
app.get("/office_list", (req, res) => {
    Office.findAll().then((result) => {
        res.send(result);
    });
});

//2. Выдать общее кол-во сотрудников в офисе
app.get("/office_workers_count", (req, res) => {
    Employees.findAll({
        where: {
            office_id: req.query.office,
        },
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("id")), "n_employees"],
        ],
    }).then((result) => {
        res.send(result);
    });
});

//3. Выдать кол-во разработчиков в офисе
app.get("/office_dev_workers_count", (req, res) => {
    Employees.findAll({
        where: {
            job: " developer",
            office_id: req.query.office,
        },
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("id")), "n_devEmployees"],
        ],
    }).then((result) => {
        res.send(result);
    });
});

//4. Выдать кол-во разработчиков определенной специальности либо/и уровня в офисе
app.get("/office_dev_workers_spec_count", (req, res) => {
    Employees.count({
        include: {
            model: Developer,
            where: {
                "$Developer.role$": req.query.dev,
                "$Developer.level$": req.query.lvl,
                "$Employees.office_id$": req.query.office,
            },
        },
    })
        .then((result) => {
            // res.send(result);
            res.json({ n_developers: result });
        })
        .catch((error) => console.log(error));
});

//5. Выдать список разработчиков с кол-вом проектов больше, меньше, либо равно n
app.get("/dev_project_count_sort", (req, res) => {
    Developer.findAll({
        where: {
            project_count: {
                [Op[req.query.symbol]]: req.query.number,
            },
        },
    }).then((result) => {
        res.send(result);
    });
});

//6. Выдать список сотрудников, устроенных в офис за указанный промежуток времени в офисе
app.get("/office_workers_range_date_list", (req, res) => {
    Employees.findAll({
        where: {
            reg_date: {
                [Op.between]: [req.query.dateStart, req.query.dateEnd],
            },
        },
    }).then((result) => {
        res.send(result);
    });
});

//7. Выдать список проектов в разработке которого участвовал указанный разработчик
app.get("/project_dev_point_list", (req, res) => {
    Projects.findAll({
        where: {
            [Op.or]: [
                { teamlead_id: req.query.devName },
                { programmer_id: req.query.devName },
                { designer_id: req.query.devName },
                { dbarch_id: req.query.devName },
            ],
        },
    }).then((result) => {
        res.send(result);
    });
});

//8. Выдать список проектов с ценой в указанном диапазоне
app.get("/project_price_range_list", (req, res) => {
    Projects.findAll({
        where: {
            price: {
                [Op.between]: [req.query.priceStart, req.query.priceEnd],
            },
        },
    }).then((result) => {
        res.send(result);
    });
});

//9. Выдать список проектов, сортированный по цене (по убыванию, по возрастанию)
app.get("/project_price_list_sort", (req, res) => {
    Projects.findAll({
        order: [["price", req.query.price_sort]],
    }).then((result) => {
        res.send(result);
    });
});

//10. Выдать список проектов с указанным заказчиком
app.get("/project_client_point_list", (req, res) => {
    Projects.findAll({
        where: {
            client_id: req.query.client,
        },
    }).then((result) => {
        res.send(result);
    });
});

//11. Выдать список первых 10 клиентов нашей компании
app.get("/client_list_10", (req, res) => {
    Clients.findAll({
        order: [["id"]],
        limit: 10,
    }).then((result) => {
        res.send(result);
    });
});

//12. Выдать список, сортированный по общей сумме денег, потраченных клиентами на проекты (по убыванию, возрастанию)
app.get("/client_cashAmount_list_sort", (req, res) => {
    Clients.findAll({
        order: [["total_sum", req.query.client_cash_sort]],
    }).then((result) => {
        res.send(result);
    });
});

module.exports = app;
