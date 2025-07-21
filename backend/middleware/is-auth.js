module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.usuarioId) {
    return res.status(401).json({ error: "No autenticado. Por favor inicie sesión." });
  }
  next();
};
