const express = require('express');
const fileupload = require('express-fileupload');
const app = express()
const path = require('path');
const port = 3010
const cors = require('cors');

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

    let isShortWords = false; // Переменная для проверки на слова с недопустимым кол-вом символов

    if (typeof words === 'object') { // если полученные данные - это объект
      const wordsLength = Object.keys(words).length;
      if (wordsLength === 0) { // если его длина 0 - отправляем сообщение об ошибке
        res.json({
          status: 'failed',
          message: 'Отправлено 0 слов'
        }) 
      } else {
        for (let key in words) {
          if (words[key].length < 2) {
            isShortWords = true;
            break;
          };
        };

        if (isShortWords) { // если есть короткие слова, отправляем сообщение об этом
          res.json({
            status: 'failed',
            message: 'Среди добавленных слов есть 1 или более недопустимой длины (менее 2 символов)'
          })
        } else {


          res.json({  // если все проверки пройдены, отправляем кол-во полученных слов
            status: 'success',
            message: `Получено ${wordsLength} слов(о)`
          });
        }
      }
    } else {
      res.json({
        status: 'failed',
        message: 'Отправлен не массив'
      })
    };

  } catch (error) {
    res.status(500).send(error)
  };
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})