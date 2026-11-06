// Проверка авторизации пользователя

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    return res.status(401).send({ message: 'Не авторизован' })
  }
};

module.exports = isAuthenticated;