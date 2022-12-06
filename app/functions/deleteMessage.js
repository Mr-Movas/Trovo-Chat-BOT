const config = require('../config.js')
const curl = require('./curl.js');

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        curl({
            url: `https://open-api.trovo.live/openplatform/channels/${config.streamer.channelID}/messages/${message.message_id}/users/${message.sender_id}`,
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TROVO_CLIENT_ID}`,
                'Authorization': `OAuth ${config.streamer.accessToken}`,
            },
        })
        .then(res => {
            console.log(`Deleted a message from ${message.nick_name} (${message.sender_id})\nMessage: ${message.content}`)
            resolve()
        })
        .catch(err => {reject()})
    })

}