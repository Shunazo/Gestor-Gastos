const Sequelize = require('sequelize');
const connection = require("../database/appContext");

const Administrador = connection.define("administrador", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});



Administrador.associate = (models) => {
    Administrador.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        onDelete: "CASCADE",
        as: "usuario"
    });
}
module.exports = Administrador;