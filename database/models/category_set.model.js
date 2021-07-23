/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");
const config = require('../../config');

class CategorySet extends Model {
    static init(sequelize) {
        return super.init({
            category_set_id: {
                field: "category_set_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            category_set_name: {
                field: "category_set_name",
                type: DataTypes.STRING
            },
        },
        {
            tableName: "category_set",
            sequelize
        });
    }

    static associate(models) {
        this.models = models;
        this.belongsTo(models.Guild, { foreignKey: 'guild_id' });
        this.hasMany(models.Category, { foreignKey: 'category_set_id' });
        this.hasMany(models.Unit, { foreignKey: 'category_set_id' });
    }

    static async exists(id) {
        const matches = await this.findAll({ where: { category_set_id: id } });
        return matches.length != 0;
    }
}

module.exports = CategorySet;