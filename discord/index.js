/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../config');
const discord_helper = require('./discord_helper');
var parseArgs = require('minimist');

// Event Listener for messages.
const message = async (message) => {
    if(message.author.bot || !config.discord.ready) return; // Do not listen to commands if they are sent by a bot, or if initialisation isn't complete.
  
    let guild = await message.guild;
    let channel = await message.channel;

    if(discord_helper.isCommand(message.content)) {
        if(message.author.id == config.discord.adminID) {
            // https://github.com/substack/minimist
            var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: "unhide"});

            if(argv["_"][0] === 'guild') {
                
                if(argv["init"]) {
                    
                    let unhideRole = false;
                    if(argv["unhide"]) {
                        console.log("Checking if Unhide role [" + argv["unhide"] + "] exists...");
                        unhideRole = guild.roles.cache.get(argv["unhide"]);
                        if(unhideRole) {
                            console.log("Found! Continuing...");
                        } else {
                            console.error("Unhide role doesn't exist.");
                            channel.send("ERROR: Unhide role doesn't exist.");
                        }
                    }

                    
                    console.log("Inserting guild into database...");
                    console.log("Guild ID   : " + guild.id);
                    console.log("Guild Name : " + guild.name);
                    if(unhideRole) console.log("Unhide Role: " + argv["unhide"]);

                    // Primitive for testing

                    let newGuild = { guild_id: guild.id, guild_name: guild.name };
                    if(unhideRole) newGuild.guild_unhide_id = argv["unhide"];

                    config.mysql.client.models.guild.create(newGuild);

                    channel.send("Successful! Continuing...")
                    console.log();
                } else {
                    channel.send("Unrecognisable command'" + argv + "'.");
                    console.log(argv);
                }
            } else {
                channel.send("Unrecognisable command '" + argv["_"] + "'.");
                console.log(argv);
            }
        } else {
            channel.send("You are not permitted to make this action.")
            console.log("Illegal attempt at command performed by [" + message.author.id + "]. Admin ID is [" + config.discord.adminID + "].");
        }
    } else {
        console.log("Message.");
    }
};

// Event Listener for when reactions are added
const messageReactionAdd = async (reaction, user) => {
    if(user.bot || !ready) return;
    
};

// Event Listener for when reactions are removed
const messageReactionRemove = async (reaction, user) => {
    if(user.bot || !ready) return;
    
};

module.exports = {
    message,
    messageReactionAdd,
    messageReactionRemove
};