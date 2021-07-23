/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Category extends Model {
    static init(sequelize) {
        return super.init({
            category_id: {
                field: "category_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            category_position: {
                field: "category_position",
                type: DataTypes.INTEGER
            },
        },
        {
            tableName: "category",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.CategorySet, { foreignKey: 'category_set_id' });

    }
}

module.exports = Category;