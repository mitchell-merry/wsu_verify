/*
 * Created by Mitchell Merry (diggitydingdong) on 23/7/2021
 */

const config = require('../../config');
const { DataTypes, Model } = require("sequelize");

class VerifyMessage extends Model {
    static init(sequelize) {
        return super.init({
            verify_message_id: {
                field: "verify_message_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            channel_id: {
                field: "channel_id",
                type: DataTypes.STRING,
            },
            emote: {
                field: "emote",
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "verify_message",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Guild, { foreignKey: 'guild_id' });
    }
}

module.exports = VerifyMessage;