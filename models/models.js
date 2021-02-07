const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Office = db.define(
    "Office",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address: DataTypes.STRING(45),
    },
    {
        // Other model options go here
        tableName: "office",
        timestamps: false,
    }
);

const Employees = db.define(
    "Employees",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(45),
        job: DataTypes.STRING(45),
        reg_date: DataTypes.DATEONLY,
        salary: DataTypes.DECIMAL(10, 2),
        weekend: DataTypes.INTEGER,
        office_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        // Other model options go here
        tableName: "employees",
        timestamps: false,
    }
);

// Employees.hasOne(Office, { foreignKey: "office_id" });
Office.belongsTo(Employees, { foreignKey: "office_id" }); // Foreign key

const Developer = db.define(
    "Developer",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role: DataTypes.STRING(45),
        level: DataTypes.STRING(45),
        project_count: DataTypes.INTEGER,
    },
    {
        // Other model options go here
        tableName: "developer",
        timestamps: false,
    }
);

Developer.belongsTo(Employees, { foreignKey: "id" }); // Foreign key

const Clients = db.define(
    "Clients",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(45),
        total_sum: DataTypes.DECIMAL(20, 2),
    },
    {
        // Other model options go here
        tableName: "clients",
        timestamps: false,
    }
);

const Projects = db.define(
    "Projects",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        price: DataTypes.DECIMAL(15, 2),
        started: DataTypes.DATEONLY,
        ended: DataTypes.DATEONLY,
        teamlead_id: { type: DataTypes.INTEGER, allowNull: false },
        designer_id: { type: DataTypes.INTEGER, allowNull: false },
        programmer_id: { type: DataTypes.INTEGER, allowNull: false },
        dbarch_id: { type: DataTypes.INTEGER, allowNull: false },
        client_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        // Other model options go here
        tableName: "projects",
        timestamps: false,
    }
);

Projects.hasOne(Developer, { foreignKey: "teamlead_id" }); // Foreign key
Projects.hasOne(Developer, { foreignKey: "designer_id" }); // Foreign key
Projects.hasOne(Developer, { foreignKey: "programmer_id" }); // Foreign key
Projects.hasOne(Developer, { foreignKey: "dbarch_id" }); // Foreign key
Projects.hasOne(Clients, { foreignKey: "client_id" }); // Foreign key

module.exports = { Clients, Developer, Employees, Office, Projects };
