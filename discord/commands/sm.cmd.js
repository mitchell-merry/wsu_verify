/*
 * Created by Mitchell Merry (diggitydingdong) on 17/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleMute = async (message, argv) => {
    const { RoleToPermission } = config.mysql.client.models;
    if(RoleToPermission.userHasPermission(message.member, "mute")) return "inval_perms";
    
    return true;
}

const handleUnmute = async (message, argv) => {
    const { RoleToPermission } = config.mysql.client.models;
    if(RoleToPermission.userHasPermission(message.member, "mute")) return "inval_perms";
    
    return true;
}

const handleBan = async (message, argv) => {
    const { RoleToPermission } = config.mysql.client.models;
    if(RoleToPermission.userHasPermission(message.member, "ban")) return "inval_perms";
    
    return true;
}

const handleStrip = async (message, argv) => {
    const { RoleToPermission } = config.mysql.client.models;
    if(RoleToPermission.userHasPermission(message.member, "strip")) return "inval_perms";
    
    return true;
}

const commands = {
    "mute": handleMute,
    "unmute": handleUnmute,
    "ban": handleBan,
    "strip": handleStrip
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["n", "head"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}