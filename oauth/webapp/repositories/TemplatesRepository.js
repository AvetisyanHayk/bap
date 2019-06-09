const fs = require('fs');
const path = require('path');
const Kernel = require('../kernel');

function find(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename(name), (err, data) => {
            if (!err) {
                let content = data.toString();
                let result = {
                    template: Buffer.from(encodeURI(content)).toString('base64'),
                }
                resolve(result)
            } else {
                console.error(err)
                reject(err)
            }
        })
    })
}

function filename(name) {
    return path.join(Kernel.templatesDir, name + '.ejs');
}

module.exports = {
    find,
}