/*
 * Created by Mitchell Merry (diggitydingdong) on 22/7/2021
 */

const config = require('../config');
const email = require('./email');
const verify_message_handler = require('./verify_message_handler');

const init = async () => {
    verify_message_handler.init();
    email.init();
}

const initialiseGuildUsers = async (guild) => {
    const { Guild, User } = config.mysql.client.models;

    const G = await Guild.findByPk(guild.id);
    if(G === undefined) return false;
    const members = await guild.members.fetch();
    await members.forEach(async (discord_user) => {
        console.log("Initialising " + discord_user.id + "...")
        const U = await User.findByPk(discord_user.id);
        if(U === null) G.createUser({user_id: discord_user.id})
        else G.addUser(U);
    });

    console.log("Done.");

    return true;
}

const associateIdentityWithUser = async (user_id, identity_id) => {
    const { Guild, Identity, User } = config.mysql.client.models;

    const U = await User.findByPk(user_id);
    if(U === undefined) return false;
    const I = await Identity.findByPk(identity_id);
    if(I === undefined) return false;

    if(U.identity_id != undefined) return false;

    U.setIdentity(I);

    return true;
}

const initiateVerificationWithUser = async (user) => {
    
}

module.exports = {
    init,
    initialiseGuildUsers,
    associateIdentityWithUser,
    initiateVerificationWithUser,
    verify_message_handler
}
