/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Role extends Model {
    static init(sequelize) {
        return super.init({
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
        },
        {
            tableName: "roles",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.RoleMenu);
        this.hasOne(models.Unit);
    }
}

module.exports = Role;