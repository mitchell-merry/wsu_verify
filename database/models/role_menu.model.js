const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("role_menu", {
        role_menu_id: {
            field: "role_menu_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        role_menu_name: {
            field: "role_menu_name",
            type: DataTypes.STRING
        },
        role_head_id: {
            field: "role_head_id",
            type: DataTypes.INTEGER,
        }
    });
};