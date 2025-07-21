const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const transporter = require("../services/EmailService");

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    if (!correo || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }

    if (!user.activo) {
      return res.status(403).json({ error: "Su cuenta está inactiva. Contacte al administrador." });
    }

    req.session.isLoggedIn = true;
    req.session.usuarioId = user.id;
    req.session.isAdmin = user.isAdmin;

    return req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error guardando sesión." });
      }

      res.json({
        message: "Inicio de sesión exitoso",
        user: {
          id: user.id,
          nombreUsuario: user.nombreUsuario,
          isAdmin: user.isAdmin,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión. Intente más tarde." });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error cerrando sesión." });
    }
    res.json({ message: "Sesion cerrada exitosamente" });
  });
}

exports.register = async (req, res) => {
    try {
        const {nombreUsuario, correo, password, confirmPassword} = req.body;
        const fotoPerfil = "/images/" + req.files.fotoPerfil[0].filename;

        if (!req.files || !req.files.fotoPerfil || req.files.fotoPerfil.length === 0) {
            return res.status(400).json({ error: "No se ha proporcionado una foto de perfil." });
        }

        if (!nombreUsuario || !correo || !password || !confirmPassword) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Las contraseñas no coinciden."});
        }

        const usuarioExiste = await Usuario.findOne({ where: { correo } });
        if (usuarioExiste) {
            return res.status(400).json({ error: "El correo ya esta registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            nombreUsuario,
            correo,
            password: hashedPassword,
            fotoPerfil,
            activo: false
        });

        const token = jwt.sign({ id: nuevoUsuario.id }, process.env.SECRET, { expiresIn: "1h" });

        transporter.sendMail(
            {
                from: "No-Reply <no-reply@Gestor.com>",
                to: correo,
                subject: "Activación de cuenta",
                html: `
                    <h1>¡Bienvenido a Gestor, ${nombreUsuario}!</h1>
                    <p>Gracias por registrarte, para activar tu cuenta, haz click en el siguiente enlace.</p>
                    <a href="${process.env.APP_URL}/auth/activate/${token}">Activar cuenta</a>
                    `, 
            },
            (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Error al enviar correo de activación." });
                }
                res.json({ message: "Registro exitoso. Por favor, revise su correo para activar su cuenta." });

            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario. Intente más tarde." });
    }
};

exports.resetToken = async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await Usuario.findOne({ where: { correo } });

        if (!user) {
            return res.status(404).json({ error: "El correo no existe." });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1h" });
        const resetLink = `${req.protocol}://${req.get("host")}/new-password/${token}`;

        await transporter.sendMail({
            from: "No-Reply <no-reply@Gestor.com>",
            to: correo,
            subject: "Restablecimiento de contraseña",
            html: `
                <h1>Restablecimiento de contraseña</h1>
                <p>Para restablecer tu contraseña, haz click en el siguiente enlace:</p>
                <a href="${resetLink}">Restablecer contraseña</a>
            `,
        });

        res.json({ 
            message: "Se ha enviado un correo para restablecer tu contraseña."
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al enviar correo de restablecimiento de contraseña. Intente más tarde." });
    }
};

exports.password = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Las contraseñas no coinciden." });
        }

        const payload = jwt.verify(token, process.env.SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        await Usuario.update(
            { password: hashedPassword },
            { where: { id: payload.id } }
        );

        res.json({ message: "Contraseña restablecida exitosamente." });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al restablecer contraseña. Intente más tarde." });
    }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Usuario.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    await Usuario.update({ activo: true }, { where: { id: decoded.id } });

    req.session.isLoggedIn = true;
    req.session.usuarioId = user.id;
    req.session.isAdmin = user.isAdmin;

    res.json({ message: "Cuenta activada exitosamente." });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al activar cuenta. Intente más tarde." });
  }
};

        






