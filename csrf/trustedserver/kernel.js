const path = require('path');

const baseDir = __dirname;
const storageDir = path.join(baseDir, '/storage');
const dataDir = path.join(storageDir, '/data');
const usersDir = path.join(dataDir, '/users');

module.exports = {
    usersDir,
}