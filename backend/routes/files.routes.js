const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');

const router = express.Router();

router.use(
  fileupload({
    createParentPath: true,
  }),
);

// Сохранение полученных pdf/docx файлов 
router.post('/upload-files', (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: 'failed',
        message: 'Файлы не были загружены'
      });

    } else {
      let files = req.files;

      // TODO: подправить проблему с названиями файлов. Когда файлы приходят на сервер, он не всегда правильно интерпретирует все символы в их названиях

      const uploadsDirectory = path.join(__dirname, '../uploads/');

      for (let file in files) {
        files[file].mv(uploadsDirectory + files[file].name);
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

module.exports = router;