/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../config');
const discord_helper = require('./discord_helper');
const commands = {
    "guild": require("./commands/guild.cmd"),
    "cset": require("./commands/cset.cmd"),
    "unit": require("./commands/unit.cmd"),
    "sm": require("./commands/sm.cmd"),
    "perm": require("./commands/perm.cmd"),
};
var parseArgs = require('minimist');
const err = require('../lang/errors.json');

const handleError = async (error, channel) => {
    if(error.cons) console.log(error.cons);
    if(error.disc) channel.send(error.disc);
}

// Event Listener for messages.
const message = async (message) => {
    // Do not listen to commands if they are sent by a bot, or if initialisation isn't complete.
    if(message.author.bot || !config.discord.ready) return false; 

    // Ignore non-commands
    if(!discord_helper.isCommand(message.content)) return false;

    // Check if user is ADMIN - primitive permission system. Update later
    if(message.author.id !== config.discord.adminID) {
        handleError(err["inval_perms"], message.channel);
        return false;
    }
    
    // PARSE COMMAND - https://github.com/substack/minimist
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '));
    if(!commands || !commands.hasOwnProperty(argv["_"][0])) {
        handleError(err["inval_cmd"], message.channel);
        return false;
    }
    
    // Get status code of command
    let status_code = await commands[argv["_"][0]].handleCommand(message);

    if(status_code === true) {
        // OK
    } else if(status_code === undefined) {
        handleError(err["undef_sc"], message.channel);
    } else {
        handleError(err[status_code], message.channel);
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