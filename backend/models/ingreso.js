const Sequelize = require('sequelize');
const connection = require("../database/appContext");

const Ingreso = connection.define("ingreso", {
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

Ingreso.associate = (models) => {
    Ingreso.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        onDelete: "CASCADE",
        as: "usuario"
    })
};

module.exports = Ingreso;
