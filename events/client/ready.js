module.exports = {
    start({ client, axios, logOwner }) {
        client.once('ready', () => {
            const time = 60 * 60000;
            const now = new Date().toLocaleString();
            setInterval(() => {
                client.guilds.cache.map(guild => {
                    const serverId = guild.id;
                    const data = {
                        icon: guild.iconURL(),
                        usersCount: guild.memberCount,
                        emoteCount: guild.emojis.cache.size,
                    };
                    axios.post('/update', {
                        serverId: serverId,
                        data: data,
                    });
                });
                logOwner(`Servidores atualizados às: ${now}`);
            }, time);
            logOwner('Ready!! ' + now);
        });
    },
};