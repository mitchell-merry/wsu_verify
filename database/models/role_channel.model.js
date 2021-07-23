/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class RoleChannel extends Model {
    static init(sequelize) {
        return super.init({
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
        },
        {
            tableName: "role_channel",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Guild, { foreignKey: 'guild_id' });
        this.hasMany(models.RoleMenu, { foreignKey: 'role_channel_id' });
    }
}

module.exports = RoleChannel;