const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { RoleMenu } = config.mysql.client.models;
                const o = await RoleMenu.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { RoleMenu } = config.mysql.client.models;
            await RoleMenu.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }