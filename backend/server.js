const express = require('express');
const fileupload = require('express-fileupload');
const app = express()
const path = require('path');
const port = 3010
const cors = require('cors');
const userWords = require('./text/user-words.json');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const pgp = require('pg-promise')()

const cn = {
    host: 'PostgreSQL-17',
    port: 5432,
    database: 'translator_dictionary',
    user: 'postgres',
    password: '',
};

const db = pgp(cn)

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.use(cors({
  origin: `http://localhost:5173`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type, Authorization"]
}));

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: true
}));

app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  };

  res.status(500).send({
    message: 'Ошибка сервера'
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Сохранение полученных pdf/docx файлов 
app.post('/upload-files', (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: 'failed',
        message: 'Файлы не были загружены'
      });

    } else {
      let files = req.files;

      // TODO: подправить проблему с названиями файлов. Когда файлы приходят на сервер, он не всегда правильно интерпретирует все символы в их названиях

      for (let file in files) {
        files[file].mv('./uploads/' + files[file].name);
      };

      res.send({
        status: 'success',
        message: 'Файл(ы) успешно загружены'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'serverError',
      message: error
    });
  }
});

app.post('/add-words', (req, res) => {
  try {
    const words = req.body;

    if (typeof words === 'object') { // если полученные данные - это объект
      const wordsLength = Object.keys(words).length;
      if (wordsLength === 0) { // если его длина 0 - отправляем сообщение об ошибке
        res.status(400).json({
          status: 'failed',
          message: 'Отправлено 0 слов'
        }) 
      } else {

        res.json({  // если все проверки пройдены, отправляем кол-во полученных слов
          status: 'success',
          message: `Получено ${wordsLength} слов(о)`
        });
      }
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'Отправлен не объект'
      })
    };

  } catch (error) {
    res.status(500).send(error)
  };
});

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

// Регистрация нового пользователя
app.post('/new-user', hashPasswordMiddleware, async (req, res) => {
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

// TODO: дописать код регистрации (отправка данных об успехе или ошибке на клиент)
// TODO: начать реализацию авторизации на сервере

// Сравнение пароля и его хэша
const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// TODO: дописать код перенаправления пользователя на главную страницу с учётом того, что он авторизован

// Проверка авторизации пользователя
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    return res.status(401).send({ message: 'Не авторизован' })
  }
};

// Авторизация пользователя
app.post('/authorization', async (req, res) => {
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
        next(err);
      };

      req.session.userId = user[0].id;

      req.session.save((err) => {
        if (err) {
          return next(err);
        };

        res.send({
          message: 'Успешная авторизация',
          redirectUrl: '/' 
        });
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Ошибка сервера' })
  };
});

app.get('/me', isAuthenticated, async (req, res, next) => {
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
app.get('/logout', (req, res, next) => {
  req.session.userId = null;
  req.session.save(() => {
    if (err) {
      next(err);
    };

    req.session.regenerate((err) => {
      if (err) {
        next(err);
      };

      res.send({
        message: 'Успешный выход из системы',
        redirectUrl: '/'
      });
    });
  })
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})