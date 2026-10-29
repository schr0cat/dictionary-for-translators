const express = require('express');
const app = express()
const path = require('path');
const port = 3010
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const sessionMiddleware = require('./config/session');

const authRoutes = require('./routes/auth.routes');
const filesRoutes = require('./routes/files.routes');
const wordsRoutes = require('./routes/words.routes');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.use(cors({
  origin: `http://localhost:5173`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type, Authorization"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.use(authRoutes);
app.use(filesRoutes);
app.use(wordsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})