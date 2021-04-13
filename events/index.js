const fs = require('fs');
const axios = require('../api');

module.exports = {
    start(client, discord, con) {
        function logOwner(message) {
            client.users.fetch(con.ownerId).then(user => {
                user.send(message);
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
            }
        });
    },
};