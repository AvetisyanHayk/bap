const path = require('path');

const baseDir = __dirname;
const storageDir = path.join(baseDir, '/storage');
const dataDir = path.join(storageDir, '/data');
const usersDir = path.join(dataDir, '/users');


const csrfConfiguration = {
    key: 'howest-bap-csrf-app-example',
    alg: "sha256",
};

module.exports = {
    usersDir,
    csrfConfiguration,
}