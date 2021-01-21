const express = require("express");
const app = express();
const db = require("../config/database");

//Sequelize
const { QueryTypes } = require("sequelize");

//1. Выдать список всех офисов
app.get("/office_list", (req, res) => {
    db.query("SELECT * FROM office", {
        type: QueryTypes.SELECT,
    }).then((result) => {
        res.send(result);
    });
});

//2. Выдать общее кол-во сотрудников в офисе
app.get("/office_workers_count", (req, res) => {
    db.query(
        `SELECT COUNT(*) FROM employees WHERE office_id = ${req.query.office}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//3. Выдать кол-во разработчиков в офисе
app.get("/office_dev_workers_count", (req, res) => {
    db.query(
        `SELECT COUNT(*) FROM employees 
            WHERE job = 'developer' and office_id = ${req.query.office}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//4. Выдать кол-во разработчиков определенной специальности либо/и уровня в офисе
app.get("/office_dev_workers_spec_count", (req, res) => {
    db.query(
        `SELECT * FROM employees 
            JOIN developer ON employees.id = developer.id 
            WHERE developer.role = '${req.query.dev}' 
            AND developer.level = '${req.query.lvl}' 
            AND employees.office_id = ${req.query.office}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//5. Выдать список разработчиков с кол-вом проектов больше, меньше, либо равно n
app.get("/dev_project_count_sort", (req, res) => {
    db.query(
        `SELECT * FROM developer 
            where project_count ${req.query.symbol} ${req.query.number}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//6. Выдать список сотрудников, устроенных в офис за указанный промежуток времени в офисе
app.get("/office_workers_range_date_list", (req, res) => {
    db.query(
        `SELECT * FROM employees 
            where reg_date between '${req.query.dateStart}' and '${req.query.dateEnd}'`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//7. Выдать список проектов в разработке которого участвовал указанный разработчик
app.get("/project_dev_point_list", (req, res) => {
    db.query(
        `SELECT * FROM projects 
            WHERE teamlead_id = ${req.query.devName} 
            or programmer_id = ${req.query.devName} 
            or designer_id = ${req.query.devName} 
            or dbArch_id = ${req.query.devName}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//8. Выдать список проектов с ценой в указанном диапазоне
app.get("/project_price_range_list", (req, res) => {
    db.query(
        `SELECT * FROM projects 
            where price between ${req.query.priceStart} and ${req.query.priceEnd}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

//9. Выдать список проектов, сортированный по цене (по убыванию, по возрастанию)
app.get("/project_price_list_sort", (req, res) => {
    db.query(`SELECT * FROM projects order by price ${req.query.price_sort}`, {
        type: QueryTypes.SELECT,
    }).then((result) => {
        res.send(result);
    });
});

//10. Выдать список проектов с указанным заказчиком
app.get("/project_client_point_list", (req, res) => {
    db.query(`SELECT * FROM projects where client_id = ${req.query.client}`, {
        type: QueryTypes.SELECT,
    }).then((result) => {
        res.send(result);
    });
});

//11. Выдать список первых 10 клиентов нашей компании
app.get("/client_list_10", (req, res) => {
    db.query("SELECT * FROM clients order by id limit 10", {
        type: QueryTypes.SELECT,
    }).then((result) => {
        res.send(result);
    });
});

//12. Выдать список, сортированный по общей сумме денег, потраченных клиентами на проекты (по убыванию, возрастанию)
app.get("/client_cashAmount_list_sort", (req, res) => {
    db.query(
        `SELECT * FROM clients order by total_sum ${req.query.client_cash_sort}`,
        {
            type: QueryTypes.SELECT,
        }
    ).then((result) => {
        res.send(result);
    });
});

module.exports = app;
