/*
 * Created by Mitchell Merry (diggitydingdong) on 23/7/2021
 */

const config = require('../../config');
const discord_helper = require('./../discord_helper');
const verify = require('../../verify');

const handleAssociate = async (message, argv) => {
    const { Permission, User, Identity } = config.mysql.client.models;
    if(!Permission.userHasPermission(message.member, "identity_associate")) return "inval_perms";
    
    if(argv.length < 4) return "not_enough_args";

    const [,, identity_id, user_id] = argv;

    const U = await User.findByPk(user_id);
    if(!U) return "inval_user";
    const I = await Identity.findByPk(identity_id);
    if(!I) return "inval_identity";

    if(U.identity_id) return "inval_identity_set";

    if(!(await verify.associateIdentityWithUser(user_id, identity_id))) return "unk_err";

    message.channel.send("Association successful.");

    return true;
};

const handleCreate = async (message, argv) => {
    const { Permission, User, Identity } = config.mysql.client.models;
    if(!Permission.userHasPermission(message.member, "identity_create")) return "inval_perms";

    if(argv.length < 4) return "not_enough_args";

    const [,, identity_id,] = argv;
    const identity_name = message.content.substring(config.helper.nthIndex(message.content, " ", 3));

    Identity.create({identity_id, identity_name});

    message.channel.send("Identity succesfully created.");

    return true;
}

const commands = {
    "associate": handleAssociate,
    "create": handleCreate,
};

const handleCommand = async (message) => {
    var argv = message.content.split(' ');

    if(!argv[1] || !commands.hasOwnProperty(argv[1])) return "inval_cmd";
    
    return commands[argv[1]](message, argv);
}

module.exports = {
    handleCommand
}