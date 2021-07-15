/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../../config');

const exists = async (id) => {
    const { category_set } = config.mysql.client.models;

    const matches = await category_set.findAll({ where: { category_set_id: id } });
    return matches.length == 0;
}

const create = async (g) => {
    const { category_set } = config.mysql.client.models;

    return await category_set.create(g);
}

const getInGuild = async (id) => {
    const { guild, category_set } = config.mysql.client.models;
    return await guild.getCategorySets(id);
}

module.exports = {
    exists,
    create,
    getInGuild
}