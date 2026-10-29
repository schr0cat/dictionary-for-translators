const express = require('express');

const router = express.Router();

router.post('/add-words', (req, res) => {
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
        console.log(words);
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

module.exports = router;