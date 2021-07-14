const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("category", {
        category_set_id: {
            field: "category_id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
        },
        category_position: {
            field: "category_position",
            type: DataTypes.INTEGER
        },
    });
};