/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const Discord = require('discord.js');
const client  = new Discord.Client();
const discord = require('./discord');
const db = require('./database');

const config = require('./config');

async function init()
{
    // Set the activity to whatever specified.
    await client.user.setActivity(config.discord.activity);
    
    // Log all the guilds (servers) and their id's that the bot is located in.
    config.discord.guildList = client.guilds.cache;
    console.log("Ready in " + client.guilds.cache.size);
    console.log(client.guilds.cache.map(g => `${g.name} [${g.id}]`).join("\n"));

    config.discord.client = client;

    const mysql = await db.connect();
    config.mysql.client = mysql;

    config.discord.ready = true;
    console.log();
}

// Event listener for when the bot is ready
client.once('ready', init);

client.login(config.discord.token);

client.on('message', discord.message);  
client.on('messageReactionAdd', discord.messageReactionAdd);
client.on('messageReactionRemove', discord.messageReactionRemove);