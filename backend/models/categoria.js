const Sequelize = require('sequelize');
const connection = require("../database/appContext");   

const Categoria = connection.define("categoria", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Categoria.associate = (models) => {

    Categoria.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        onDelete: "CASCADE",
        as: "usuario"
    })

    Categoria.hasMany(models.Gasto, {
        foreignKey: "categoriaId",
        onDelete: "CASCADE",
        as: "gastos"
    });

};



module.exports = Categoria;