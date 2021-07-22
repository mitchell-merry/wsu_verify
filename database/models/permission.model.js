/*
 * Created by Mitchell Merry (diggitydingdong) on 20/7/2021
 */

const config = require('../../config');
const { DataTypes, Model } = require("sequelize");

class Permission extends Model {
    static init(sequelize) {
        return super.init({
            role_id: {
                field: "role_id",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
            permission_name: {
                field: "permission_name",
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                autoIncrement: false,
            },
        },
        {
            tableName: "permission",
            sequelize
        });
    }

    static associate(models) {
        // this.belongsTo(models.Role);

    }

    static async userHasPermission(member, perm="") {
        let rolesWithPerm = await this.findAll({ where: { permission_name: perm } });
        rolesWithPerm = rolesWithPerm.map(r => r.dataValues.role_id);
        
        for(const r of rolesWithPerm) {
            if(member.roles.cache.has(r)) return true;
        }

        return member.permissions.has('ADMINISTRATOR') || member.guild.ownerID === member.id;
    }
}

module.exports = Permission;