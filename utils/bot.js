const Discord = require('discord.js');
const client = new Discord.Client();
const con = require('../config.json');
const botEvents = require('../events');

module.exports = {
    awake() {
        botEvents.start(client, Discord, con);
        client.login(con.token);
    },
};
