/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class RoleMenu extends Model {
    static init(sequelize) {
        return super.init({
            role_menu_id: {
                field: "role_menu_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            role_menu_name: {
                field: "role_menu_name",
                type: DataTypes.STRING
            },
            role_head_id: {
                field: "role_head_id",
                type: DataTypes.STRING,
            }
        },
        {
            tableName: "role_menus",
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Role);
        this.belongsTo(models.RoleChannel);
    }
}

module.exports = RoleMenu;