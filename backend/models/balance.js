const Sequelize = require('sequelize');
const connection = require("../database/appContext");

const Balance = connection.define("balance", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    monto:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Balance.Associate = (models) => {
    Balance.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        onDelete: "CASCADE",
        as: "usuario"
    });
};

module.exports = Balance;