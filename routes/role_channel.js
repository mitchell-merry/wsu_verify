const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { RoleChannel } = config.mysql.client.models;
                const o = await RoleChannel.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { RoleChannel } = config.mysql.client.models;
            await RoleChannel.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }