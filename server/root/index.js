const get = require('./get');
const post = require('./post');

module.exports = {
    get: (req, res) => get(req, res),
    post: (req, res) => post(req, res)
};
