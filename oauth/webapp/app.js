const express = require("express");
const http = require("http");
const path = require("path");
const usersRepo = require("./repositories/UserRepository");
const bodyParser = require('body-parser')

let HTTP_PORT = process.argv[2] || 8083;

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const templatesRouter = require('./routes/templates');

let app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.disable('etag');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/templates', templatesRouter);
app.use('/', indexRouter);

usersRepo.init();

let httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, function () {
    console.log(`"Listening Http Server, called "Web Application", on port ${HTTP_PORT}"`);
});

module.exports = {
    app,
}