const Discord = require('discord.js');
const axios = require('./../api');
module.exports = {
    name: 'set-channel',
    description: 'configura um canal para dar logs dos votos',
    usage: '[#nome-do-chat]',
    execute(message, args) {

        const embed = new Discord.MessageEmbed();
        embed.setColor('#51d651');
        const channel = !args[0] ? message.channel : message.mentions.channels.first();


        axios.post('/update', {
            serverId: message.guild.id,
            data: {
                logChannel: channel.id,
            },
        }).then(response => {
            console.log(response.data);
            if (response.data == true) {
                embed.setDescription('agora todos votarem usando !vote aparecerão no canal ' + channel.name);
            }
            else {
                embed.setDescription('este canal já está setado');
            }
            message.channel.send(embed);
        });
    },
};