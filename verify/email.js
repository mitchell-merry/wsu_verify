/*
 * Created by Mitchell Merry (diggitydingdong) on 22/7/2021
 */

const config = require('../config');
const nodemailer = require('nodemailer');

const init = () => {
    config.email.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.address,
            pass: config.email.password
        }
    });
}

const sendMail = async (mailOptions) => {
    config.email.transporter.sendMail(mailOptions, (error, info) => {
        console.log(error ? error : info.response);
    });
}

module.exports = {
    init,
    sendMail,
}