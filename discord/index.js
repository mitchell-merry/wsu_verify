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
    "identity": require("./commands/identity.cmd"),
    "verify": require('./commands/verify.cmd'),
};
var parseArgs = require('minimist');
const err = require('../lang/errors.json');
const verify = require('../verify');

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
    
    // bot channel
    const { BotChannel } = config.mysql.client.models;
    if(!(await BotChannel.isValid(message.channel, message.guild))) return "inval_channel_perms";
    
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
    
    const { RoleMenu, VerifyMessage } = await config.mysql.client.models;

    const V = await VerifyMessage.findByPk(reaction.message.id);
    if(V && V.dataValues.emote === reaction._emoji.name) verify.verify_message_handler.react(V, reaction, user);
};

// Event Listener for when reactions are removed
const messageReactionRemove = async (reaction, user) => {
    if(user.bot || !config.discord.ready) return;
    
};

// When we join a guild, initialise it automatically
const onJoinGuild = async (guild) => {
    const { Guild } = config.mysql.client.models;

    let newGuild = { guild_id: guild.id }
    await Guild.create(newGuild);
    console.log("Initialised " + guild.id);

    // await verify.initialiseGuildUsers(message.guild);
};

module.exports = {
    message,
    messageReactionAdd,
    messageReactionRemove,
    onJoinGuild,
};