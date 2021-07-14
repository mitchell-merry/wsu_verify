/*
 * Created by Mitchell Merry (diggitydingdong) on 15/7/2021
 */

const config = require('../config');

const isCommand = (s) => {
    return s.startsWith(config.discord.prefix);
}

const trimPrefix = (s) => {
    if(isCommand(s)) return s.substring(config.discord.prefix.length);
    else return s;
}

module.exports = {
    isCommand,
    trimPrefix,
};