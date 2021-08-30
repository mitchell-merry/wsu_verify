/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('../discord_helper');
const verify = require('../../verify');
var parseArgs = require('minimist');

const handleInit = async (message, argv) => {
    const { Guild, Permission } = config.mysql.client.models;
    if(!Permission.userHasPermission(message.member)) return "inval_perms";

    let exists = await Guild.exists(message.guild.id);
    if(exists) return "inval_guild_exists";

    let newGuild = { guild_id: message.guild.id };
    let unhideRole = false;
    if(argv["unhide"]) {
        unhideRole = message.guild.roles.cache.get(argv["unhide"]);
        if(unhideRole === false) return "inval_guild_unhide";
        newGuild.guild_unhide_id = argv["unhide"];
    }
    
    let mute_cat = false;
    if(argv["mute_cat"]) {
        mute_cat = message.guild.channels.cache.get(argv["mute_cat"]);
        if(mute_cat === false) return "inval_guild_mute_cat";
        newGuild.guild_mute_cat_id = argv["mute_cat"];
    }

    let mute_cat_arch = false;
    if(argv["mute_cat_arch"]) {
        mute_cat_arch = message.guild.channels.cache.get(argv["mute_cat_arch"]);
        if(mute_cat_arch === false) return "inval_guild_mute_cat_arch";
        newGuild.guild_mute_cat_arch_id = argv["mute_cat_arch"];
    }

    let mute_role = false;
    if(argv["mute_role"]) {
        mute_role = message.guild.channels.cache.get(argv["mute_role"]);
        if(mute_role === false) return "inval_guild_mute_role_arch";
        newGuild.guild_mute_role_id = argv["mute_role"];
    }

    await Guild.create(newGuild);

    const result = await verify.initialiseGuildUsers(message.guild);
    if(!result) return "unk_err";

    message.channel.send("Succesfully initialised guild.");
    return true;
}

const handleIsInit = async (message, argv) => {
    const { Guild, Permission } = config.mysql.client.models;
    if(!Permission.userHasPermission(message.member, "guild_isInit")) return "inval_perms";
    
    let id = message.guild.id;
    if(argv["id"]) id = argv["id"];
    
    let exists = await Guild.exists(id);
    let o = exists ? "" : " not";
    
    message.channel.send(argv["id"] ? "The guild with that ID has" + o + " been initialised." : "This guild has" + o + " been initialised.");

    return true;
}

const handleAddBotChannel = async (message, argv) => {
    const { Guild, BotChannel, Permission } = config.mysql.client.models;

    const G = await Guild.findByPk(message.guild.id);
    if(G === null) return "inval_guild"; // If the guild exists in our database
    if(!Permission.userHasPermission(message.member, "guild_addBotChannel")) return "inval_perms";
    if(argv["_"].length < 3) return "not_enough_args";

    const id = message.content.split(' ')[2];
    const ch = await message.guild.channels.cache.get(id);
    if(ch === undefined) return "inval_channel";
    const e = await BotChannel.exists(argv["_"][2]);
    if(e) return "inval_bot_channel_exists";

    G.createBotChannel({ bot_channel_id: ch.id });

    return true;
}

const commands = {
    "init": handleInit,
    "isInit": handleIsInit,
    "addBotChannel": handleAddBotChannel,
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["unhide", "id", "mute_cat", "mute_cat_arch", "mute_role"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}