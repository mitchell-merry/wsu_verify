const config = require('../config');

function initialiseRoutes(app, prefix) {
    app.route(prefix)
        .get(async (req, res) => {
            if(config.discord.ready) {
                const { VerifyMessage } = config.mysql.client.models;
                const o = await VerifyMessage.findAll();
                const response = o.map(g => g.dataValues);
                res.json(response);
            }
        })
        .post(async (req, res) => {
            const { VerifyMessage } = config.mysql.client.models;
            await VerifyMessage.create(req.body);
            res.status(201).end();
        })
}

module.exports = { initialiseRoutes }