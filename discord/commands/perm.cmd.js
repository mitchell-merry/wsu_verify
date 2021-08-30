/*
 * Created by Mitchell Merry (diggitydingdong) on 17/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');
const perms = require('../perms.json');

const handleAdd = async (message, argv) => {
    const { Guild, Permission } = config.mysql.client.models;

    const exists = await Guild.exists(message.guild.id);
    if(!exists) return "inval_guild";
    if(argv["_"].length < 4) return "not_enough_args";

    if(!Permission.userHasPermission(message.member, "perms")) return "inval_perms";

    const id = message.content.split(' ')[2];
    const role = await message.guild.roles.cache.get(id);
    if(role === undefined) return "perm_inval_role";

    const ps = argv["_"][3].split(",");
    const rtps = []
    for(const p of ps) {
        if(!perms.includes(p)) return "perm_inval_perm";
        rtps.push({ role_id: argv["_"][2], permission_name: p });
    };

    Permission.bulkCreate(rtps).then(() => message.channel.send("Permissions given."));
    return true;
}

const handleRemove = async (message, argv) => {

    return true;
}

const handleGet = async (message, argv) => {

    return true;
}

const commands = {
    "add": handleAdd,
    "remove": handleRemove,
    "get": handleGet,
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["n", "head"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}