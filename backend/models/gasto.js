const Sequelize = require('sequelize');
const connection = require("../database/appContext");

const Gasto = connection.define("gasto", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },

    descripcion:{
        type: Sequelize.STRING,
        allowNull: false
    },

    monto:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    fecha:{
        type: Sequelize.DATE,
        allowNull: false
    }
});

Gasto.associate = (models) => {
    Gasto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        onDelete: "CASCADE",
        as: "categoria"
    });
}

module.exports = Gasto;