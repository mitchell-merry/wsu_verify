/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("category_set", {
        category_set_id: {
            field: "category_set_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        category_set_name: {
            field: "category_set_name",
            type: DataTypes.STRING
        },
    });
};