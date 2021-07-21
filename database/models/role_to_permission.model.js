/*
 * Created by Mitchell Merry (diggitydingdong) on 20/7/2021
 */

const config = require('../../config');
const { DataTypes, Model } = require("sequelize");

class RoleToPermission extends Model {
    static init(sequelize) {
        return super.init({
            role_id: {
                field: "role_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            permission: {
                field: "permission",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
        },
        {
            tableName: "role_to_permission",
            sequelize
        });
    }

    static associate(models) {
        // this.belongsTo(models.Role);

    }

    static async userHasPermission(user, perm) {
        let rolesWithPerm = await RoleToPermission.findAll({ where: { permission: perm } });
        rolesWithPerm = rolesWithPerm.map(r => r.dataValues.role_id);
        
        for(const r of rolesWithPerm) {
            if(user.roles.cache.has(r)) return true;
        }

        return message.member.permissions.has('ADMINISTRATOR');
    }
}

module.exports = RoleToPermission;