require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config.js');

app.get('/', (req, res) => {
    res.redirect(`https://open.trovo.live/page/login.html?client_id=${process.env.TROVO_CLIENT_ID}&response_type=token&scope=chat_send_self+send_to_my_channel+manage_messages&redirect_uri=http://localhost:3000/response&state=statedata`);
})

const curl = require('./functions/curl.js');
const listener = require('./listener.js');

app.get('/response', async (req, res) => {
    const accessToken = req.query.access_token;

    let user = await curl({
        url: 'https://open-api.trovo.live/openplatform/validate',
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${process.env.TROVO_CLIENT_ID}`,
            'Authorization': `OAuth ${accessToken}` 
        }
    })

    config.streamer.name = user.nick_name;
    config.streamer.id = user.uid;
    config.streamer.accessToken = accessToken;

    listener();
  
    res.send('You can close this tab now, check the console if the bot is working.');
})

app.listen(3000, () => {
    console.log('Click the link in the console to start the bot');
    console.log(`http://localhost:3000`);
})