# Trovo-Chat-BOT
 A Trovo bot that moderates your chat, deletes messages that include words you don't want and create your own commands.

### To make it work you will need to have install nodejs.

### You will have to edit the .env file.<br>
 You will have to visit https://developer.trovo.live/ and create a new application,<br>
 Inside the .env file you will replace "your_client_id" to the client id of your app<br>
 Inside the .env file you will replace "your_client_secret" to the client secret of your app<br>

### Inside the config folder you can do any changes you want.
#### commands.json
 There you will find some examples of commands you can add.<br>
 Make sure that you have a comma ( , ) next to every command expect the last one

#### deleteMessagesWithWords.txt
 Inside that file you can add any word or sentence you want to be deleted automaticly from the bot.
 
#### replies.json
 Inside that file you can not add extra options like the commands file, you can only change the messages of the bot when an event is happening.<br>
 {username} will be replaced with the name of the user making that action.<br>
 {total_amount} will be replaced with the total amount of the spells he gave.<br>
 If you don't want the bot to message any event keep the message empty.

### How to start the bot
 - Open terminal.<br>
 - cd ./your/path/to/the/folder
 - npm start (to start the bot after you have the the .env and config files)
 - open your browser and go to http://localhost:3000
 - login with trovo
 - see the console if the bot has succesfully connected
