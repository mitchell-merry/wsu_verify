/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Unit extends Model {
    static init(sequelize) {
        return super.init({
            unit_id: {
                field: "unit_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            unit_name: {
                field: "unit_name",
                type: DataTypes.STRING
            },
            channel_id: {
                field: "channel_id",
                type: DataTypes.STRING,
            }
        },
        {
            tableName: "unit",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.CategorySet, { foreignKey: 'category_set_id' });
        this.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
}

module.exports = Unit;