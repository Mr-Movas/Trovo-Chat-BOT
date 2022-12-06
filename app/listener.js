require('dotenv').config();
const fs = require('fs');
const {WebSocket} = require('ws');
const curl = require('./functions/curl.js');
const config = require('./config.js');


module.exports = () => {

    const websocket = new WebSocket('wss://open-chat.trovo.live/chat');

    websocket.once('open', async () => {

        let channelID = await curl({
            url: 'https://open-api.trovo.live/openplatform/getusers',
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Client-ID': `${process.env.TROVO_CLIENT_ID}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `{"user":["${config.streamer.name}"]}`
        })

        if(channelID.status == 1002) return console.log('Invalid streamer name in config/streamer.json');
        if(channelID.status == 11701) return console.log('Invalid Trovo Client ID in .env file');
        if(typeof channelID.status != 'undefined') return console.log('Unknown error');

        config.streamer.channelID = channelID.users[0].channel_id
        channelID = channelID.users[0].channel_id

        //GET THE CHANNEL TOKEN OF THE STREAMER
        let channelToken = await curl({url: `https://open-api.trovo.live/openplatform/chat/channel-token/${channelID}`, headers: {'Accept': 'application/json', 'Client-ID': `${process.env.TROVO_CLIENT_ID}`}})
        .catch(err => {
            return console.log(err);
        })

        channelToken = channelToken.token

        //SEND THE AUTHENTICATION MESSAGE
        websocket.send(`{"type": "AUTH", "nonce": "Auth", "data": {"token": "${channelToken}"}}`)

        //CREATE A HEARTBEAT FOR THE WEBSOCKET
        setInterval(() => {
            websocket.send(`{"type": "PING", "nonce": "ping"}`);
        }, 27000);


        console.log(`Connected to Trovo WebSocket for streamer ${config.streamer.name} (${config.streamer.id})`)
    })

    const messageEvent = require('./events/message.js');
    const otherEvent = require('./events/other.js');

    websocket.on('message', async (message) => {
        message = JSON.parse(message)

        if(message.type == 'PONG') return //console.log(`[INFO] Received PONG from Trovo WebSocket for streamer ${config.streamer.name} (${config.streamer.id})`)

        if(message.type != 'CHAT' || typeof message?.data?.chats == 'undefined') return

        let msg = message?.data?.chats[0]

        //MESSAGE
        if(message?.data?.chats?.length == 1 && typeof msg.content_data != 'undefined' && msg?.type == 0) {
            messageEvent(msg)
        }

        //EVENTS
        if(message?.data?.chats?.length == 1 && (msg?.type == 5 || msg?.type == 5009 || msg?.type == 6 || msg?.type == 7 || msg?.type == 8 || msg?.type == 9 || msg?.type == 5001 || msg?.type == 5005 || msg?.type == 5006)) {
            otherEvent(msg)
        }

    })

    websocket.on('close', () => {
        console.log(`Disconnected from Trovo WebSocket for streamer ${config.streamer.name} (${config.streamer.id})`)
        console.log(`Cannot listen for events anymore. Restart the bot if this is not intended.`)
    })
}