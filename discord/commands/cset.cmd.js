/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
var parseArgs = require('minimist');

const handleCreate = async (message, argv) => {
    const { Guild, BotChannel, CategorySet, Permission } = config.mysql.client.models;

    const G = await Guild.findByPk(message.guild.id);

    if(!(await BotChannel.isValid(message.channel, message.guild))) return "inval_channel_perms";
    if(G === null) return "inval_guild"; // If the guild exists in our database
    if(Permission.userHasPermission(message.member, "cset_create")) return "inval_perms";
    if(!argv["n"]) return "inval_cset_name"; // If the name option has been set
    if(!argv["head"]) return "inval_cset_head_unspec"; // If the head option has been set
    
    const cat_head = message.guild.channels.cache.get(argv["head"]);
    if(cat_head === undefined) return "inval_cset_head"; // If the head option has been set

    const exists = await CategorySet.exists(argv["head"]);
    if(exists) return "inval_cset_head_used"; // The head must not be used by any otehr cset
    
    // Create the category set under the guild
    const newCSet = { 
        category_set_id: argv["head"], 
        category_set_name: argv["n"] 
    };
    
    G.createCategorySet(newCSet);

    message.channel.send("Created.");

    return true;
}

const handleList = async (message, argv) => {
    const { Guild, Permission } = config.mysql.client.models;
    
    const G = await Guild.findByPk(message.guild.id);
    if(G === null) return "inval_guild"; // If the guild exists in our database
    if(Permission.userHasPermission(message.member, "cset_list")) return "inval_perms";
    
    const category_sets = await G.getCategorySets(); // Get the category sets under the guild
        
    // Generate output per category set
    let o = category_sets.map(cs => {
        return `${cs.category_set_id} | ${cs.category_set_name}`;
    }).join("\n");
        
    // Message if the guild has no sets defined.
    if(category_sets.length === 0) o = "This guild has no category sets.";

    // Output to user in discord
    message.channel.send(`\`\`\`${o}\`\`\``); // its more efficient this way i swear
    
    return true;
}

const commands = {
    "create": handleCreate,
    "list": handleList,
};

const handleCommand = async (message) => {
    var argv = parseArgs(discord_helper.trimPrefix(message.content).split(' '), {string: ["n", "head"]});

    if(!argv["_"][1] || !commands.hasOwnProperty(argv["_"][1])) return "inval_cmd";
    
    return commands[argv["_"][1]](message, argv);
}

module.exports = {
    handleCommand
}