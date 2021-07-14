const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("role", {
        role_id: {
            field: "role_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        role_emote: {
            field: "role_emote",
            type: DataTypes.STRING
        },
    });
};