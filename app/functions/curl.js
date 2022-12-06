let request = require('request');

module.exports = (options) => new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
        if (error) return reject(error);
        resolve(JSON.parse(body));
    });
});