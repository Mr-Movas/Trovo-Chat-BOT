const config = require('../config.js')
const sendMessage = require('../functions/sendMessage.js')

module.exports = (data) => {

    let username = data.nick_name
    let content = JSON.parse(data.content)

    //SPELLS
    if(data.type == 5 || data.type == 5009) {
        if(config.replies.spells.length > 0) sendMessage(config.replies.spells.replaceAll('{username}', username).replaceAll('{total_amount}', content.num*content.gift_value).replaceAll('{spell_type}', content.value_type))
    }

    //SUPER CAP POINTS
    else if(data.type == 6) {
        if(config.replies.magic_chat_super_cap_chat.length > 0) sendMessage(config.replies.magic_chat_super_cap_chat.replaceAll('{username}', username))
    }

    //COLORFUL CHAT POINTS
    else if(data.type == 7) {
        if(config.replies.magic_chat_colorful_chat.length > 0) sendMessage(config.replies.magic_chat_colorful_chat.replaceAll('{username}', username))
    }

    //SPELL CHAT POINTS
    else if(data.type == 8) {
        if(config.replies.magic_chat_spell_chat.length > 0) sendMessage(config.replies.magic_chat_spell_chat.replaceAll('{username}', username))
    }

    //BULLET SCREEN POINTS
    else if(data.type == 9) {
        if(config.replies.magic_chat_bullet_screen_chat.length > 0) sendMessage(config.replies.magic_chat_bullet_screen_chat.replaceAll('{username}', username))
    }

    //SUBS
    else if(data.type == 5001) {
        if(config.replies.subscription.length > 0) sendMessage(config.replies.subscription.replaceAll('{username}', username))
    }

    //RANDOM GIFT SUBS
    else if(data.type == 5005) {
        if(config.replies.random_gift_subscription.length > 0) sendMessage(config.replies.random_gift_subscription.replaceAll('{username}', username).replaceAll('{total_amount}', data.content))
    }

    //GIFT SUBS
    else if(data.type == 5006) {
        if(config.replies.gift_subscription.length > 0) sendMessage(config.replies.gift_subscription.replaceAll('{username}', username))
    }
}