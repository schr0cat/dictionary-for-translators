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
    res.status(500).send(error);
  }
});

app.post('/add-words', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send('Слова получены');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})