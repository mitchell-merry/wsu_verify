/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: "unhide"});
    const { guild } = config.mysql.client.models;

    // if(argv["_"][1] && argv["_"][1] == "create") {                
        
    // } else {
    //     message.channel.send("Unrecognisable command.");
    //     console.log(argv);
    // }
}

module.exports = {
    handleCommand
}