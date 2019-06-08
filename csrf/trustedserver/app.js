const express = require("express");
const http = require("http");
const path = require("path");
const usersRepo = require("./repositories/UserRepository");
const authMiddleware = require('./middlewares/AuthMiddleware');
const csrfMiddleware = require('./middlewares/CSRFMiddleware');

let HTTP_PORT = process.argv[2] || 8081;

const sessions = require('./sessions');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

let app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.disable('etag');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

sessions.init(app);

app.use('/auth', authRouter);
app.all('*', authMiddleware);
app.post('*', csrfMiddleware);
app.use('/', indexRouter);

usersRepo.init();

let httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, function () {
    console.log(`"Listening Http Server, called "Trusted Server", on port ${HTTP_PORT}"`);
});

module.exports = {
    app,
}