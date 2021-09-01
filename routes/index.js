const config = require('../config');
const cors = require('cors');
const express = require("express");
const app = express();

const prefix = "/api/v1/"

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get(prefix + "guild", async (req, res) => {
    if(config.discord.ready) {
        const { Guild } = config.mysql.client.models;
        const o = await Guild.findAll();
        const response = o.map(g => g.dataValues);
        res.json(response);
    }
});

// Returns bot information
app.get(prefix + "bot", async (req, res) => {
    if(config.discord.ready) {
        res.json({
            id: config.discord.client.user.id,
            username: config.discord.client.user.username,
            discriminator: config.discord.client.user.discriminator,
            avatar: config.discord.client.user.avatar,
            readyAt: config.discord.client.readyAt
        });
    }
});

module.exports = app;