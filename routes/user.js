const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { User } = config.mysql.client.models;
                const o = await User.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { User } = config.mysql.client.models;
            await User.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }