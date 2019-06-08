const crypto = require('crypto');

const Kernel = require('../kernel');
const csrfConfiguration = Kernel.csrfConfiguration;

function create(sessionId) {
    let tokenSecret = csrfConfiguration.key + '.' + sessionId;
    return crypto.createHmac(csrfConfiguration.alg, tokenSecret)
        .update(sessionId)
        .digest("hex");
}

module.exports = {
    create,
}