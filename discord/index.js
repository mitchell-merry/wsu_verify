/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../config');
const discord_helper = require('./discord_helper');
const commands = {
    "guild": require("./commands/guild.cmd"),
    "cset": require("./commands/cset.cmd")
};
var parseArgs = require('minimist');

// Event Listener for messages.
const message = async (message) => {
    if(message.author.bot || !config.discord.ready) return; // Do not listen to commands if they are sent by a bot, or if initialisation isn't complete.
  

    if(discord_helper.isCommand(message.content)) {
        if(message.author.id == config.discord.adminID) {
            // https://github.com/substack/minimist
            var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '));

            if(commands && !commands.hasOwnProperty(argv["_"][0])) {
                channel.send("Unrecognisable command '" + argv["_"] + "'.");
                console.log(argv);
            } else {
                await commands[argv["_"][0]].handleCommand(message);
            }
        } else {
            channel.send("You are not permitted to make this action.")
            console.log("Illegal attempt at command performed by [" + message.author.id + "]. Admin ID is [" + config.discord.adminID + "].");
        }
    } else {
        // console.log("Message.");
    }
};

// Event Listener for when reactions are added
const messageReactionAdd = async (reaction, user) => {
    if(user.bot || !config.discord.ready) return;
    
};

// Event Listener for when reactions are removed
const messageReactionRemove = async (reaction, user) => {
    if(user.bot || !config.discord.ready) return;
    
};

module.exports = {
    message,
    messageReactionAdd,
    messageReactionRemove
};