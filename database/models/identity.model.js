/*
 * Created by Mitchell Merry (diggitydingdong) on 22/7/2021
 */

const { DataTypes, Model } = require("sequelize");
const config = require('../../config');

class Identity extends Model {
    static init(sequelize) {
        return super.init({
            identity_id: {
                field: "identity_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            identity_name: {
                field: "identity_name",
                type: DataTypes.STRING,
            },
            identity_email: {
                field: "identity_email",
                type: DataTypes.STRING,
            },
            identity_member: {
                field: "identity_member",
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: "identity",
            sequelize
        });
    }

    static associate(models) {
        this.models = models;
        this.hasOne(models.User, { foreignKey: 'identity_id' });
    }
}

module.exports = Identity;