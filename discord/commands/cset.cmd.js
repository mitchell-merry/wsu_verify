/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

async function create() {

}

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: "n"});
    const { Guild, CategorySet } = config.mysql.client.models;

    const G = await Guild.findByPk(message.guild.id);

    if(!argv["_"][1]) { } 
    else if(argv["_"][1] == "create") {        
        if(G !== null) { // If the guild exists in our database
            if(argv["n"]) { // If the name option has been set
                const newCSet = { category_set_name: argv["n"] }
                G.createCategorySet(newCSet); // Create the category set under the guild

                message.channel.send("Created.");
            } else { // Name is required
                message.channel.send("Please specify a name. Usage: " + config.discord.prefix + "cset create --n=\"<name>\"");
            }
        } else { // Can only create sets under guilds that have been init'd
            message.channel.send("This guild has not been initialised. Please do so first.");
        }
    } else if(argv["_"][1] == "list") {   
        if(G !== null) { // The guild must exist
            const category_sets = await G.getCategorySets(); // Get the category sets under the guild
            
            // Generate output per category set
            let o = category_sets.map(cs => {
                return `${cs.category_set_id} | ${cs.category_set_name}`;
            }).join("\n");
            
            // Message if the guild has no sets defined.
            if(category_sets.length === 0) o = "This guild has no category sets.";

            // Output to user in discord
            message.channel.send(`\`\`\`${o}\`\`\``); // its more efficient this way i swear
        } else {
            message.channel.send("This guild has not been initalised.");
        }
    } else {
        message.channel.send("Unrecognisable command.");
        console.log(argv);
    }
}

module.exports = {
    handleCommand
}