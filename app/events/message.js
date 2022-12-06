require("dotenv").config();
const curl = require('../functions/curl.js');
const config = require('../config.js');
const sendMessage = require('../functions/sendMessage.js')
const deleteMessage = require('../functions/deleteMessage.js')

module.exports = async (message) => {
    //CHECK IF MESSAGE IS DELETABLE
    for(const words of config.deleteMessagesWithWords) {
        if(message.content.toLowerCase().includes(words.toLowerCase())) {
            return deleteMessage(message).catch(err => {console.log('Failed to delete message.')})
        }
    }

    //CHECK IF THE MESSAGE IS A COMMAND
    for (const [key, value] of Object.entries(config.commands)) {
        if(message.content.toLowerCase().startsWith(`!${key.toLowerCase()}`)) {
            sendMessage(value).catch(err => {console.log('Failed to send response command.')})
        }
    }
}   