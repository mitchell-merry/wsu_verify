/*
 * Created by Mitchell Merry (diggitydingdong) on 22/7/2021
 */

const { DataTypes, Model } = require("sequelize");
const config = require('../../config');

class User extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                field: "user_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
        },
        {
            tableName: "user",
            sequelize
        });
    }

    static associate(models) {
        this.models = models;
        this.belongsTo(models.Identity, { foreignKey: 'identity_id' });
        this.belongsToMany(models.Guild, { through: 'guild_member', foreignKey: 'user_id', otherKey: 'guild_id' });
    }
}

module.exports = User;