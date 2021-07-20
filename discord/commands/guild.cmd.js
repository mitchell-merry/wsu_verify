/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

// TODO: Clean as we expand, good enough for now
const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: "unhide"});
    // const { guild } = config.mysql.client.models;
    const { Guild } = config.mysql.client.models;

    if(!argv["_"][1]) {

    }
    else if(argv["_"][1] == "init") {                
        let unhideRole = false;
        if(argv["unhide"]) {
            console.log("Checking if Unhide role [" + argv["unhide"] + "] exists...");
            unhideRole = message.guild.roles.cache.get(argv["unhide"]);
            if(unhideRole) {
                console.log("Found! Continuing...");
            } else {
                console.error("Unhide role doesn't exist.");
                message.channel.send("ERROR: Unhide role doesn't exist.");
                return;
            }
        }

        let exists = await Guild.exists(message.guild.id);
        if(!exists) {
            console.log("Inserting guild into database...");
            console.log("Guild ID   : " + message.guild.id);
            console.log("Guild Name : " + message.guild.name);
            if(unhideRole) console.log("Unhide Role: " + argv["unhide"]);

            // Primitive for testing

            let newGuild = { 
                guild_id: message.guild.id, 
                guild_unhide_id: (unhideRole ? argv["unhide"] : null)
            };

            Guild.create(newGuild);

            message.channel.send("Successful! Continuing...")
        } else {
            message.channel.send("Guild already exists.");
        }
    } else if(argv["_"][1] == "isInit") {
        let id = message.guild.id;
        if(argv["id"]) {
            id = argv["id"];
        }
        
        let exists = await Guild.exists(id);
        let o = exists ? "" : " not";
        message.channel.send(argv["id"] ? "The guild with that ID has" + o + " been initialised." : "This guild has" + o + " been initialised.");
    } else {
        message.channel.send("Unrecognisable command.");
        console.log(argv);
    }
}

module.exports = {
    handleCommand
}