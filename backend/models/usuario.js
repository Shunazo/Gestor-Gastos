const Sequelize = require('sequelize');
const connection = require("../database/appContext");

const Usuario = connection.define("usuario", {
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

    apellido:{
        type: Sequelize.STRING,
        allowNull: false
    },

    correo:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },

    nombreUsuario:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    activo:{    
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    fotoPerfil:{
        type: Sequelize.STRING,
        allowNull: true
    },
    isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Usuario.associate = (models) => {
    Usuario.hasMany(models.Categoria, {
        foreignKey: "usuarioId",
        onDelete: "CASCADE",
        as: "categorias"
    });
};

module.exports = Usuario;