/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("guild", {
        guild_id: {
            field: "guild_id",
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        guild_name: {
            field: "guild_name",
            type: DataTypes.STRING
        },
        guild_unhide_id: {
            field: "guild_unhide_id",
            type: DataTypes.STRING
        },
    });
};