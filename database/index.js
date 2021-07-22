/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const Sequelize = require('sequelize');
const config = require('../config');

const sync = async (sequelize) => {
    const models = {
        Guild: require('./models/guild.model').init(sequelize),
        BotChannel: require('./models/bot_channel.model').init(sequelize),
        CategorySet: require('./models/category_set.model').init(sequelize),
        Category: require('./models/category.model').init(sequelize),
        RoleChannel: require('./models/role_channel.model').init(sequelize),
        RoleMenu: require('./models/role_menu.model').init(sequelize),
        Permission: require('./models/permission.model').init(sequelize),
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