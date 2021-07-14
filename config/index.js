const pkg = require("../package.json");
var auth = require('./auth.json'); // sensitive info - a json file with the properties below (auth.*)

module.exports = {
    discord: {
        prefix: '--',
        activity: 'hi :)',
        token: auth.token,
        guildList: null,
        adminID: auth.adminID,
    },
    email: {
        user: auth.user,
        pass: auth.pass,
    },
    mysql: {
        options: {
            host: auth.host,
            port: auth.post,
            database: auth.database,
            dialect: "mysql",
            username: auth.dbuser,
            password: auth.dbpass,
        },
        client: null,
    }
}