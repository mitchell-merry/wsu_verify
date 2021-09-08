const config = require('../config');
const cors = require('cors');
const express = require("express");
const app = express();

const prefix = "/api/v1/"

app.use(express.json());
app.use(cors());
app.options('*', cors());

const endpoints = {
    guild: require('./guilds'),
    botChannel: require('./bot_channel'),
    categorySet: require('./category_set'),
    category: require('./category'),
    identity: require('./identity'),
    roleChannel: require('./role_channel'),
    roleMenu: require('./role_menu'),
    permission: require('./permission'),
    role: require('./role'),
    unit: require('./unit'),
    user: require('./user'),
    verifyMessage: require('./verify_message'),
};

for (const [key, value] of Object.entries(endpoints)) {
    value.initialiseRoutes(app, prefix + key);
}

// Returns bot information (single endpoint)
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