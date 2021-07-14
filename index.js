const Discord = require('discord.js');
const client  = new Discord.Client();

var auth = require('./auth.json'); //  Contains the authorisation token needed for connection.
var info = require('./info.json'); // Info like prefix and such
var ready = false

async function init()
{
    // Set the activity to whatever specified.
    await client.user.setActivity("");
    
    // Log all the guilds (servers) and their id's that the bot is located in.
    helper.guildList = client.guilds.cache
    console.log("Ready in " + client.guilds.cache.size);
    console.log(client.guilds.cache.map(g => `${g.name} [${g.id}]`).join("\n"));
    // client.guilds.cache.forEach(guild => {
    //     a(guild);
    //       // Outputs the guild name + the invite URL
    //   });

    ready = true
}

// Event listener for when the bot is ready
client.once('ready', init)

client.login(auth.token);

// Event Listener for messages.
client.on('message', async message => {
    if(message.author.bot || !ready) return; // Do not listen to commands if they are sent by a bot.
  
    let guild = await message.guild;
    let channel = await message.channel;
  
  });
  
  // Event Listener for when reactions are added
  client.on('messageReactionAdd', (reaction, user) => {
    if(user.bot || !ready) return;
  
    
  });
  
  // Event Listener for when reactions are removed
  client.on('messageReactionRemove', (reaction, user) => {
    if(user.bot || !ready) return;
  
  });