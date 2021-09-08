const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { Unit } = config.mysql.client.models;
                const o = await Unit.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { Unit } = config.mysql.client.models;
            await Unit.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }