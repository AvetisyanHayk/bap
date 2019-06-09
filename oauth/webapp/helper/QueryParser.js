const url = require('url');

function parse(request) {
    var url_parts = url.parse(request.url, true);
    return url_parts.query;
}

module.exports = {
    parse,
}