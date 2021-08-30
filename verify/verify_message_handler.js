/*
 * Created by Mitchell Merry (diggitydingdong) on 23/7/2021
 */

const config = require('../config');

const init = async () => {
    // Cache verify messages
    const { VerifyMessage } = config.mysql.client.models;
    const channels = await VerifyMessage.findAll({
        attributes: [
            'verify_message_id',
            'channel_id',
            'guild_id',
        ]
    })

    channels.forEach(async (V) => {
        const g = await config.discord.client.guilds.cache.get(V.dataValues.guild_id);
        if(!g) console.log(`MAJOR ERROR: ${V.dataValues.guild_id} NOT FOUND`);
        
        const c = await g.channels.cache.get(V.dataValues.channel_id);
        if(!c)  console.log(`MAJOR ERROR: ${V.dataValues.channel_id} NOT FOUND`);
        
        await c.messages.fetch(V.dataValues.verify_message_id, true, true);
        
    });
}

const create = async (guild_id, channel_id, verify_message_id, emote) => {
    
    const { Guild, VerifyMessage } = config.mysql.client.models;
   
    const G = await Guild.findByPk(guild_id); 
    const guild = await config.discord.client.guilds.cache.get(guild_id);
    if(!G || !guild) return "inval_guild";
    
    const channel = await guild.channels.cache.get(channel_id);
    if(!channel) return "inval_channel";

    const verify_message = await channel.messages.fetch(verify_message_id);
    if(!verify_message) return "inval_message";

    let V = await VerifyMessage.findByPk(verify_message_id);
    if(V) return "verify_message_exists";

    verify_message.react(emote);

    G.createVerifyMessage({ verify_message_id, channel_id, emote });

    return true;
}

const react = (V, reaction, user) => {
    user.send('heard u wanted to verify');
}

module.exports = { 
    init,
    create,
    react 
};