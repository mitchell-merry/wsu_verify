const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("role_channel", {
        role_channel_id: {
            field: "role_channel_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        role_channel_name: {
            field: "role_channel_name",
            type: DataTypes.STRING
        },
    });
};