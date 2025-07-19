module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.usuarioId || !req.session.rol) {
      return res.redirect("/");
  }
  next();
};
