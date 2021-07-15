/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Guild extends Model {
    static init(sequelize) {
        return super.init({
            guild_id: {
                field: "guild_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            // guild_name: {
            //     field: "guild_name",
            //     type: DataTypes.STRING
            // },
            guild_unhide_id: {
                field: "guild_unhide_id",
                type: DataTypes.STRING
            },
        },
        {
            tableName: "guild",
            sequelize
        })
    }
}