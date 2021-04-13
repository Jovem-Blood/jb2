const fs = require('fs');
const con = require('../config.json');
const axios = require('../api');

module.exports = (client, discord) => {
    function logOwner(message) {
        client.users.fetch(con.ownerId).then(user => {
            user.send(message);
            console.log('👾');
        });
    }

    const params = {
        client: client,
        discord: discord,
        axios: axios,
        con: con,
        logOwner,
    };

    ['client', 'guild'].forEach(dir => {
        const eventFiles = fs.readdirSync(`./events/${dir}`);
        for (const file of eventFiles) {
            const event = require(`./${dir}/${file}`);
            event.start(params);

            // const eventName = file.split('.')[0];
            // client.on(eventName, event.bind(null, discord, client, axios, con, logOwner));
        }
    });
};