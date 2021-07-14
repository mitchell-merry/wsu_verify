/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const pkg = require("../package.json");
// sensitive info / specific to our needs - a json file with the following props:
// token, adminID, emailaddr, emailpass, host, port, database, dbuser, dbpass
var auth = require('./auth.json'); 

module.exports = {
    discord: {
        prefix: ',',
        activity: 'hi :)',
        token: auth.token,
        guildList: null,
        adminID: auth.adminID,
        client: null,
        ready: false,
    },
    email: {
        address: auth.emailaddr,
        password: auth.emailpass,
    },
    mysql: {
        options: {
            host: auth.host,
            port: auth.port,
            database: auth.database,
            dialect: "mysql",
            username: auth.dbuser,
            password: auth.dbpass,
            logging: false,
        },
        client: null,
        force: true,
    }
}