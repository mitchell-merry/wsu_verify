/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Guild extends Model {
    static init(sequelize) {
        return super.init({
            guild_id: {
                field: "guild_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            guild_unhide_id: {
                field: "guild_unhide_id",
                type: DataTypes.STRING
            },
            guild_mute_cat_id: {
                field: "guild_mute_cat_id",
                type: DataTypes.STRING
            },
            guild_mute_cat_arch_id: {
                field: "guild_mute_cat_arch_id",
                type: DataTypes.STRING
            },
            guild_mute_role_id: {
                field: "guild_mute_role_id",
                type: DataTypes.STRING
            },
        },
        {
            tableName: "guilds",
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.CategorySet, { foreignKey: 'guild_id' });
        this.hasMany(models.RoleChannel, { foreignKey: 'guild_id' });
        this.hasMany(models.BotChannel, { foreignKey: 'guild_id' });
    }

    static async exists(id) {
        const matches = await this.findAll({ where: { guild_id: id } });
        return matches.length != 0;
    }
}

module.exports = Guild;