const emojiExtract = require('emoji-extract-sentiment');

module.exports = {
    start({ client, axios }) {
        client.on('guildCreate', guild => {
            let guildName = guild.name;

            emojiExtract(guildName).forEach(e => {
                guildName = guildName.replace(e.emoji, '&#x' + e.unicode + ';');
            });

            const data = {
                server_id: guild.id,
                name: guildName,
                icon: guild.iconURL() === null ? 'null' : guild.iconURL(),
                usersCount: guild.memberCount,
                emoteCount: guild.emojis.cache.size,
            };
            axios.post('/create', {
                data: data,
            });

        });
    },
};