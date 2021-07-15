/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("category", {
        category_set_id: {
            field: "category_id",
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
        },
        category_position: {
            field: "category_position",
            type: DataTypes.INTEGER
        },
    });//, { underscored: true });
};