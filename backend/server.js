const express = require('express');
import fileupload from "express-fileupload";
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

app.post('/upload-files', (req, res) => {
  console.log(req.body);
  res.send('Все файлы были успешно получены');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})