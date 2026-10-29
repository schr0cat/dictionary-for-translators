const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// Генерация хэша пароля
const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const pass = req.body.password;

    if (!pass) {
      return res.status(400).json({ message: 'Отсутствует пароль' })
    };

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    req.body.password = hashedPassword;

    next()
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Ошибка хеширования пароля' })
  }
};

// Сравнение пароля и его хэша
const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Регистрация нового пользователя
router.post('/new-user', hashPasswordMiddleware, async (req, res) => {
  console.log(req.body)
  const { email, password, username } = req.body;

  db.any('INSERT INTO users(email, password_hash, display_name) VALUES($1, $2, $3)', [email, password, username])
    .then(_ => {
      res.send({ message: 'Успешная регистрация' })
    })
    .catch(err => {
      console.log(err)
      res.send({ message: 'Ошибка при регистрации' })
    })
});

// Авторизация пользователя
router.post('/authorization', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.any('SELECT * FROM users WHERE display_name = $1', username);

    if (user.length === 0) {
      res.status(401).send({ message: 'Пользователь с таким именем не найден' });
      return;
    };

    const isMatch = await validatePassword(password, user[0].password_hash);

    if (!isMatch) {
      res.status(401).send({ message: 'Неверный пароль' });
      return;
    };

    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      };

      req.session.userId = user[0].id;

      req.session.save((err) => {
        if (err) {
          return next(err);
        };

        // console.log(req.session.userId);

        res.send({
          message: 'Успешная авторизация',
          // redirectUrl: '/' 
        });
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Ошибка сервера' })
  };
});

// Проверка того, авторизован пользователь или нет
router.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    const user = await db.oneOrNone(
      'SELECT id, display_name FROM users WHERE id = $1', req.session.userId
    );

    if (!user) {
      return res.status(401).send({
        message: 'Войдите в аккаунт'
      });
    };

    res.send({ user });

    // TODO: дописать функцию возврата данных авторизованному пользователю
  } catch (error) {
    next(error);
  }
});

// Выход пользователя из системы
router.post('/logout', (req, res, next) => {
  req.session.userId = null;
  req.session.save((err) => {
    if (err) {
      next(err);
    };

    req.session.regenerate((err) => {
      if (err) {
        next(err);
      };

      res.status(204).send({
        message: 'Успешный выход из системы',
      });
    });
  })
});

module.exports = router;