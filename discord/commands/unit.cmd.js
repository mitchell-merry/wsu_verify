/*
 * Created by Mitchell Merry (diggitydingdong) on 17/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["m", "d"]});
    const { Guild, Unit } = config.mysql.client.models;

    if(!argv["_"][1]) {

    }
    else if(argv["_"][1] === "create") {
        if(argv["m"]) {
            const msg = await message.channel.messages.fetch(argv["m"]);
            if(msg !== undefined) {
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
            } else {
                message.channel.send("Unable to find the specified message. Please ensure it's in this channel and not older than 14 days.")
            }
        } else {
            message.channel.send("Please specify a message containing the list of units to add.");
        }
    } else if(argv["_"][1] == "isInit") {
    } else {
        message.channel.send("Unrecognisable command.");
        console.log(argv);
    }
}

module.exports = {
    handleCommand
}