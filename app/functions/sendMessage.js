const config = require('../config.js')
const curl = require('./curl.js');

module.exports = (content) => {
    return new Promise((resolve, reject) => {
        curl({
            url: 'https://open-api.trovo.live/openplatform/chat/send',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TROVO_CLIENT_ID}`,
                'Authorization': `OAuth ${config.streamer.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `{"content": "${content}"}`
        })
        .then(res => {resolve()})
        .catch(err => {reject()})
    })

}