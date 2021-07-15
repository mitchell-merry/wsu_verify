/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("role_channel", {
        role_channel_id: {
            field: "role_channel_id",
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        // role_channel_name: {
        //     field: "role_channel_name",
        //     type: DataTypes.STRING
        // },
    });//, { underscored: true });
};