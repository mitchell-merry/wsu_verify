/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("role", {
        role_id: {
            field: "role_id",
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        role_emote: {
            field: "role_emote",
            type: DataTypes.STRING
        },
    });//, { underscored: true });
};