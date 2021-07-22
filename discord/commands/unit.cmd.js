/*
 * Created by Mitchell Merry (diggitydingdong) on 17/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleCreate = async (message, argv) => {
    const { Permission } = config.mysql.client.models;
    if(Permission.userHasPermission(message.member, "unit_create")) return "inval_perms";
    if(!argv["m"]) return "inval_unit_msg_unspec";

    const msg = await message.channel.messages.fetch(argv["m"]);
    if(msg === undefined) return "inval_unit_msg";
    
    const roles = msg.content.split('\n');

    for(const r of roles) {
        let d = /\s+(.+)/;
        if(argv["d"]) d = argv["d"];
        const info = r.split(d);
        
        if(info.length == 0) return;
        
        const newUnit = { unit_id: info[0], unit_name: null };
        if(info.length > 1) newUnit.unit_name = info[1];

        Unit.create(newUnit);
    }

    message.channel.send("Complete.");

    return true;
}

const commands = {
    "create": handleCreate,
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["n", "head"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}