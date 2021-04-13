module.exports = {
    start({ client, axios }) {
        client.on('guildDelete', guild => {
            axios.post('/delete', {
                serverId: guild.id,
            });
        });
    },
};