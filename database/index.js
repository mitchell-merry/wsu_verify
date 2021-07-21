/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const Sequelize = require('sequelize');
const config = require('../config');

const sync = async (sequelize) => {
    const models = {
        Guild: require('./models/guild.model').init(sequelize),
        CategorySet: require('./models/category_set.model').init(sequelize),
        Category: require('./models/category.model').init(sequelize),
        RoleChannel: require('./models/role_channel.model').init(sequelize),
        RoleMenu: require('./models/role_menu.model').init(sequelize),
        RoleToPermission: require('./models/role_to_permission.model').init(sequelize),
        Role: require('./models/role.model').init(sequelize),
        Unit: require('./models/unit.model').init(sequelize),
    };

    // code i found on stackoverflow to help me debug & write code
    Object.values(models)
        .filter(model => typeof model.associate === "function")
        .forEach(model => model.associate(models));


        for (let model of Object.keys(models)) {
            if(models[model].name === 'Sequelize')
               continue;
            if(!models[model].name)
              continue;
          
            console.log("\n\n----------------------------------\n", 
            models[model].name, 
            "\n----------------------------------");
          
            
            console.log("\nAssociations");
            for (let assoc of Object.keys(models[model].associations)) {
              for (let accessor of Object.keys(models[model].associations[assoc].accessors)) {
                console.log(models[model].name + '.' + models[model].associations[assoc].accessors[accessor]+'()');
              }
            }
          }

    // const { guild, category_set, category, role_channel, role_menu, role, unit } = sequelize.models;

    // // Define associations here
    // guild.hasMany(category_set, { as: "CategorySets" });//, { foriegnKey: "guild_id" });
    // category_set.belongsTo(guild);//, { foriegnKey: "guild_id" });
        
    // category_set.hasMany(category);//, { as: "category_set_id" });

    // guild.hasMany(role_channel);//, { as: "guild_id" });

    // role_channel.hasMany(role_menu);//, { as: "role_channel_id" });

    // role_menu.hasMany(role);//, { as: "role_menu_id" });

    // category_set.hasMany(unit);//, { as: "category_set_id" });
    // unit.belongsTo(role);//, { as: "role_id" }); // this is not defining correctly, at least i think, it's doing 1:m not 1:1
    
    sequelize.sync({force: config.mysql.force});
}

const connect = async () => {
    const sequelize = await new Sequelize(config.mysql.options);

    await sequelize.authenticate()
    .then(() => {
        console.info("Successfully connected to database " + config.mysql.options.database + ".");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
        
    sync(sequelize);

    return sequelize;
}



module.exports = {
    connect,
    sync
};