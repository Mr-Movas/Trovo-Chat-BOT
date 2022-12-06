/*

DO NO CHANGE THIS FILE
DO NO CHANGE THIS FILE
DO NO CHANGE THIS FILE

*/
const fs = require('fs');

module.exports = {
    commands: require('../config/commands.json'),
    replies: require('../config/replies.json'),
    deleteMessagesWithWords: fs.readFileSync('./config/deleteMessagesWithWords.txt', 'utf8').split('\n'),
    streamer: {
        name: null,
        id: null,
        accessToken: null,
        channelID: null
    }
}