/*
 * Created by Mitchell Merry (diggitydingdong) on 17/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleMute = async (message, argv) => {
    const { Guild, RoleToPermission } = config.mysql.client.models;
    if(!RoleToPermission.userHasPermission(message.member, "mute")) return "inval_perms";
    
    const G = await Guild.findByPk(message.guild.id);
    if(G === null) return "inval_guild"; // If the guild exists in our database

    if(argv.length < 3) return "not_enough_args";
    const user = await message.guild.members.fetch(argv[2]);
    if(user === undefined) return "sm_inval_user";

    const mute_cat = message.guild.channels.cache.get(G.dataValues.guild_mute_cat_id);
    if(mute_cat === undefined) return "sm_inval_mute_cat";
    
    let mute_role = await message.guild.roles.cache.get(G.dataValues.guild_mute_role_id);
    if(mute_role === undefined) return "sm_inval_mute_role";
    
    const everyone = await message.guild.roles.cache.find(r => r.name === '@everyone');

    // Create the Permissions object
    let permissionOverwrites = [
        {
            id: everyone.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: user.id,
            allow: ['VIEW_CHANNEL'],
        }
    ];

    let roles_with_perms = await RoleToPermission.findAll({where: {permission: "mute"}});
    // Let all the mod roles view the muted channel
    for(const r of roles_with_perms) {
        permissionOverwrites.push({
            id: r.dataValues.role_id,
            allow: ['VIEW_CHANNEL'],
        });
    }

    // Create the channel
    const mute_channel = await message.guild.channels.create(`mute ${user.id}`, {
        type: 'text',
        parent: mute_cat,
        permissionOverwrites,
        reason: "Created via mute command",
        topic: user.id
    });
    await message.channel.send(`Channel created at <#${mute_channel.id}>.`);
    
    user.roles.add(mute_role);
    await message.channel.send(`User given mute role. \`,sm unmute ${user.id}\` to unmute.`);

    mute_channel.send(`<@${user.id}> You have been muted. Please wait for an admin or mod to discuss with you the reason for the mute.`);

    return true;
};

const handleUnmuteBan = async (message, argv) => {
    const { Guild, RoleToPermission } = config.mysql.client.models;
    if(argv[1] === "unmute" && !RoleToPermission.userHasPermission(message.member, "mute")) return "inval_perms";
    else if(argv[1] === "ban" && !RoleToPermission.userHasPermission(message.member, "ban")) return "inval_perms";
    
    const G = await Guild.findByPk(message.guild.id);
    if(G === null) return "inval_guild"; // If the guild exists in our database

    if(argv.length < 3) return "not_enough_args";
    const user = await message.guild.members.fetch(argv[2]);
    if(user === undefined) return "sm_inval_user";

    const mute_cat = await message.guild.channels.cache.get(G.dataValues.guild_mute_cat_id);
    if(mute_cat === undefined) return "sm_inval_mute_cat";

    const mute_cat_arch = await message.guild.channels.cache.get(G.dataValues.guild_mute_cat_arch_id);
    if(mute_cat_arch === undefined) return "sm_inval_mute_cat_arch";
    
    const mute_role = await message.guild.roles.cache.get(G.dataValues.guild_mute_role_id);
    if(mute_role === undefined) return "sm_inval_mute_role";
    
    let ch = await mute_cat.children.find(channel => channel.topic === argv[2]);
    if(ch === undefined) return "sm_inval_mute_channel";

    const everyone = await message.guild.roles.cache.find(r => r.name === '@everyone');

    ch.setParent(mute_cat_arch);
    ch.overwritePermissions([{id: everyone.id, deny: [['VIEW_CHANNEL'], ['SEND_MESSAGES']]}]); // no-one can view archived
    user.roles.remove(mute_role);

    if(argv[1] === "unmute") {
        ch.send("You have been unmuted. You can go back to the rest of the server now.");
    } else if(argv[1] === "ban") {
        message.guild.members.ban(user.id).then(u => ch.send(`User was banned.`));
    }

    return true;
};

const handleStrip = async (message, argv) => {
    const { RoleToPermission } = config.mysql.client.models;
    if(!RoleToPermission.userHasPermission(message.member, "strip")) return "inval_perms";
    
    if(argv.length < 3) return "not_enough_args";
    const user = await message.guild.members.fetch(argv[2]);
    if(user === undefined) return "sm_inval_user";

    await user.roles.cache
        .filter(r => r.name !== "@everyone")
        .forEach(r => user.roles.remove(r));

    message.channel.send("User stripped of roles.");

    return true;
};

const commands = {
    "mute": handleMute,
    "unmute": handleUnmuteBan,
    "ban": handleUnmuteBan,
    "strip": handleStrip
};

const handleCommand = async (message) => {
    var argv = message.content.split(' ');

    if(!argv[1] || !commands.hasOwnProperty(argv[1])) return "inval_cmd";
    
    return commands[argv[1]](message, argv);
}

module.exports = {
    handleCommand
}