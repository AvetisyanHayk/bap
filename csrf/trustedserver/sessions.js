const session = require('express-session');

const sessionConfig = {
    secret: 'csrf demo',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 /* min */ * 60 /* s */ * 1000 /* ms */
    }
};

function init(app) {
    app.use(session(sessionConfig));
}

module.exports = {
    init,
}