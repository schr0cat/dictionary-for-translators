const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const db = require('../config/db');

router.post('/add-words', isAuthenticated, async (req, res, next) => {
  try {
    const words = req.body;

    if (typeof words === 'object') { // если полученные данные - это объект
      const wordsLength = Object.keys(words).length; 

      // TODO: подправить эту часть. Тут нужно учитывать, что в объекте с клиента приходят свойства originLang и translateLang, которые также увеличивают значение переменной wordsLength

      if (wordsLength === 0) { // если его длина 0 - отправляем сообщение об ошибке
        res.status(400).json({
          status: 'failed',
          message: 'Отправлено 0 слов'
        }) 
      } else {
        // console.log(words);
        await saveWords(words, req.session.userId);
        res.json({  // если все проверки пройдены, отправляем кол-во полученных слов
          status: 'success',
          message: `Слова сохранены`
        });
      }
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'Отправлен не объект'
      })
    };

  } catch (error) {
    next(error)
    // res.status(500).send(error)
  };
});

async function saveWords(words, userId) {
  const { originLang, translateLang, ...onlyWords } = words;

  const keys = Object.keys(onlyWords);
  const wordsObj = {};

  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];

    if (i % 2 === 0) { // превращаем данные из объекта formData в объект вида: 'слово: перевод, слово: перевод, ...'
      wordsObj[onlyWords[currentKey]] = onlyWords[keys[i+1]]
    };
  };

  for (let key in wordsObj) {
    try {
      await db.none('INSERT INTO dictionary_entries(user_id, source_text, translation, source_language, target_language) VALUES($1, $2, $3, $4, $5)', [userId, key, wordsObj[key], originLang, translateLang]);
    } catch (err) {
      throw err;
    };
  };
  
};

router.get('/recently-added', isAuthenticated, async (req, res, next) => {
  console.log(1);
  const userId = req.session.userId;

  try {
    const words = await db.any(`SELECT * FROM dictionary_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 5`);

    res.json(words);
  } catch (err) {
    next(err);
  }
});

module.exports = router;