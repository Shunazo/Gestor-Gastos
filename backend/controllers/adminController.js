const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const Usuario = require("../models/usuario");

exports.home = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.session.usuarioId);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    res.json({ message: "Bienvenido", nombreUsuario: usuario.nombreUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar el home." });
  }
};

exports.updatePerfil = async (req, res) => {
  try {
    const { nombreUsuario, correo} = req.body;
    const usuario = await Usuario.findByPk(req.session.usuarioId);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    usuario.nombreUsuario = nombreUsuario;
    usuario.correo = correo;
    await usuario.save();

    res.json({ message: "Perfil actualizado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el perfil." });
  }
}

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ where: { [Op.not]: { id: req.session.usuarioId, isAdmin: false } } });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
}

exports.activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    usuario.activo = true;
    await usuario.save();

    res.json({ message: "Usuario activado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al activar el usuario." });
  }
}

exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    usuario.activo = false;
    await usuario.save();

    res.json({ message: "Usuario desactivado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al desactivar el usuario." });
  }
}

