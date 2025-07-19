const Sequelize = require("sequelize");
const path = require("path");

const connection = new Sequelize("sqlite::memory:", {
    dialect : "sqlite",
    storage : path.join(
        path.dirname(require.main.filename),
        "database",
        "Gestor.sqlite"
    )
});

module.exports = connection;