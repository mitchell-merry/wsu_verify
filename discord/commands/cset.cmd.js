/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');
const guild = require('../../database/drivers/guild');
const category_set = require('../../database/drivers/category_set');

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: "n"});

    if(!argv["_"][1]) { } 
    else if(argv["_"][1] == "create") {        
        if(await guild.exists(message.guild.id)) {        
            if(argv["n"]) {
                const newCSet = {
                    category_set_name: argv["n"],
                    guildGuildId: message.guild.id
                }

                category_set.create(newCSet);
                message.channel.send("Created.");
            } else {
                message.channel.send("Please specify a name. Usage: " + config.discord.prefix + "cset create --n=\"<name>\"");
                console.log(await guild.exists(message.guild.id));
            }
        } else {
            message.channel.send("This guild has not been initialised. Please do so first.");
        }
    } else if(argv["_"][1] == "list") {                
        const category_sets = category_set.getInGuild(message.guild.id);
        console.log(JSON.stringify(category_sets));
    } else {
        message.channel.send("Unrecognisable command.");
        console.log(argv);
    }
}

module.exports = {
    handleCommand
}