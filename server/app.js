const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth-router');
const contentRouter = require('./routes/content-router');
const mapTileRouter = require('./routes/map-tile-router');
const tilesetRouter = require('./routes/tileset-router');

const testRouter = require('./routes/test-router');

const app = express();
const hostname = "0.0.0.0";
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', usersRouter);
app.use('/', mapTileRouter);
app.use('/test', testRouter);

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app;
