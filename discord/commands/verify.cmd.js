/*
 * Created by Mitchell Merry (diggitydingdong) on 23/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');
const { verify_message_handler } = require('../../verify');

const handleAdd = async (message, argv) => {
    const { Guild, Permission, VerifyMessage } = config.mysql.client.models;

    const G = await Guild.findByPk(message.guild.id);
    if(!G) return "inval_guild";
    if(argv.length < 5) return "not_enough_args";

    if(!Permission.userHasPermission(message.member, "verify_addMessage")) return "inval_perms";

    const [,, channel_id, verify_message_id, emote] = argv;

    const r = await verify_message_handler.create(message.guild.id, channel_id, verify_message_id, emote);

    if(r !== true) return r;

    message.channel.send("Success!");

    return true;
}

const commands = {
    "add": handleAdd,
};

const handleCommand = async (message) => {
    var argv = message.content.split(' ');

    if(!argv[1] || !commands.hasOwnProperty(argv[1])) return "inval_cmd";
    
    return commands[argv[1]](message, argv);
}

module.exports = {
    handleCommand
}