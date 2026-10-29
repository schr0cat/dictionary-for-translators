// Проверка авторизации пользователя

const isAuthenticated = (req, res, next) => {
  console.log(req.session.userId)

  if (req.session.userId) {
    next();
  } else {
    return res.status(401).send({ message: 'Не авторизован' })
  }
};

module.exports = isAuthenticated;