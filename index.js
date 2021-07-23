/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const PORT = 3001;

const Discord = require('discord.js');
const { Intents, Client } = Discord;
const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
]);
const client  = new Client({ ws: { intents } });
const express = require("express");
const app = express();

const discord = require('./discord');
const db = require('./database');
const config = require('./config');

async function init()
{
    // Set the activity to whatever specified.
    await client.user.setActivity(config.discord.activity);
    
    // Log all the guilds (servers) and their id's that the bot is located in.
    config.discord.guildList = client.guilds.cache;
    console.log("Ready in " + client.guilds.cache.size);
    console.log(client.guilds.cache.map(g => `${g.name} [${g.id}]`).join("\n"));

    config.discord.client = client;

    const mysql = await db.connect();
    config.mysql.client = mysql;

    config.discord.ready = true;
    console.log();
}

// Event listener for when the bot is ready
client.once('ready', init);

client.login(config.discord.token);

client.on('message', discord.message);  
client.on('messageReactionAdd', discord.messageReactionAdd);
client.on('messageReactionRemove', discord.messageReactionRemove);

// Express testing

app.use(express.json());

app.get("/api", async (req, res) => {
    res.json([
        {"rel": "guilds", "uri": "/api/guilds"},
        {"rel": "units", "uri": "/api/units"},
        {"rel": "csets", "uri": "/api/csets"},
    ])
})

app.get("/api/guilds", async (req, res) => {
    if(config.discord.ready) {
        const { Guild } = config.mysql.client.models;
        const o = await Guild.findAll();
        const response = o.map(g => g.dataValues);
        res.json(response);
    }
})

app.get("/api/csets", async (req, res) => {
    if(config.discord.ready) {
        const { CategorySet } = config.mysql.client.models;
        const o = await CategorySet.findAll();
        const response = o.map(cs => cs.dataValues);
        res.json(response);
    }
})

app.get("/api/units", async (req, res) => {
    if(config.discord.ready) {
        const { Unit } = config.mysql.client.models;
        const o = await Unit.findAll();
        const response = o.map(unit => unit.dataValues);
        res.json(response);
    }
})

app.post('/api/units', async (req, res) => {
    console.log(req.body);
    if(config.discord.ready) {
        const { Unit } = config.mysql.client.models;
        const o = await Unit.create(req.body);
    }
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})