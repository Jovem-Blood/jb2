const axios = require('../api');
const Discord = require('discord.js');
module.exports = {
    name: 'rank',
    description: 'Mostra um ranking dos servidores mais votados',
    execute(message) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Ranking Top 10');
        embed.setColor('RANDOM');
        axios.post('/rank').then(resp => {
            const rank = resp.data;
            rank.map((v, i) => {
                const match = v.name.match(/&#x\w+;/g);
                if (match) {
                    match.map(m => {
                        const pattern = m;
                        m = (m.split('&#x')[1]).split(';')[0];
                        v.name = v.name.replace(pattern, String.fromCodePoint(parseInt(m, 16)));
                    });
                }
                // v.name = String.fromCodePoint(parseInt('1F47E', 16));
                embed.addField(`${i + 1}º ${v.name}`, `Com ${v.votes} votos!`);

            });
            message.channel.send(message.author, embed);
        });

    },

};
