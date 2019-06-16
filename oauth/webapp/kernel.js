const path = require('path');

const baseDir = __dirname;
const storageDir = path.join(baseDir, '/storage');
const dataDir = path.join(storageDir, '/data');
const usersDir = path.join(dataDir, '/users');
const layoutsDir = path.join(baseDir, '/views');
const templatesDir = path.join(layoutsDir, '/templates');

const jwtConfiguration = {
    secret: 'howest-bap-oauth-app-example',
    expiresInMinutes: 15,
}

const jwtScopes = {
    READ: "read",
    WRITE: "write",
}

module.exports = {
    usersDir,
    templatesDir,
    jwtConfiguration,
    jwtScopes,
}