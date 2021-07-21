/*
 * Created by Mitchell Merry (diggitydingdong) on 21/7/2021
 */

const config = require('../../config');
const { DataTypes, Model } = require("sequelize");

class BotChannel extends Model {
    static init(sequelize) {
        return super.init({
            bot_channel_id: {
                field: "bot_channel_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            guild_id: {
                field: "guild_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
        },
        {
            tableName: "bot_channel",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Guild);
    }

    static async exists(id) {
        const matches = await this.findAll({ where: { bot_channel_id: id } });
        return matches.length != 0;
    }

    static async isValid(channel, guild) {
        const { Guild } = config.mysql.client.models;
        const G = await Guild.findByPk(guild.id);
        if(G === null) return true;

        const valids = (await G.getBotChannels()).map(bc => bc.dataValues.bot_channel_id);
        return valids.length == 0 || valids.includes(channel.id);
    }
}

module.exports = BotChannel;