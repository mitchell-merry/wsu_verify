const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { Category } = config.mysql.client.models;
                const o = await Category.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { Category } = config.mysql.client.models;
            await Category.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }