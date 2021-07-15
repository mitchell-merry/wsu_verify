/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const { DataTypes, Model } = require("sequelize");

class Category extends Model {
    static init(sequelize) {
        return super.init({
            category_set_id: {
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
            tableName: "categories",
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.CategorySet);

    }
}

module.exports = Category;