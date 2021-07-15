/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');

const exists = async (id) => {
    const { guild } = config.mysql.client.models;

    const guildMatches = await guild.findAll({ where: { guild_id: id } });
    return guildMatches.length != 0;
}

const create = async (g) => {
    const { guild } = config.mysql.client.models;

    return await guild.create(g);
}

module.exports = {
    exists,
    create
}