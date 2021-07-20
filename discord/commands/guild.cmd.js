/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleInit = async (message, argv) => {
    const { Guild } = config.mysql.client.models;
    let unhideRole = false;
    
    if(argv["unhide"]) {
        unhideRole = message.guild.roles.cache.get(argv["unhide"]);
        if(unhideRole === false) return "inval_guild_unhide";
    }

    let exists = await Guild.exists(message.guild.id);
    if(exists) return "inval_guild_exists";

    let newGuild = { 
        guild_id: message.guild.id, 
        guild_unhide_id: (unhideRole ? argv["unhide"] : null)
    };

    Guild.create(newGuild);

    message.channel.send("Succesfully initialised guild.");
    return true;
}

const handleIsInit = async (message, argv) => {
    const { Guild } = config.mysql.client.models;
    
    let id = message.guild.id;
    if(argv["id"]) id = argv["id"];
    
    let exists = await Guild.exists(id);
    let o = exists ? "" : " not";
    
    message.channel.send(argv["id"] ? "The guild with that ID has" + o + " been initialised." : "This guild has" + o + " been initialised.");

    return true;
}

const commands = {
    "init": handleInit,
    "isInit": handleIsInit,
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["unhide", "id"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}