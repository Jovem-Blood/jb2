const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const con = require('./config.json');
const prefix = con.prefix;
const axios = require('./api');
require('./events')(client, Discord);


/*
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function logOwner(message) {
    client.users.fetch(con.ownerId).then(user => {
        user.send(message);
    });
}
client.once('ready', () => {

    // client.user.setStatus('invisible');
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
    logOwner('Ready! ' + now);
});

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

client.on('guildDelete', guild => {
    axios.post('/delete', {
        serverId: guild.id,
    });
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args && !args.length) {
        let reply = `este comando precisa de parâmetros, ${message.author}!`;
        if (command.usage) {
            reply += `\nA forma certa de usar é: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    try {
        command.execute(message, args, client, con);
    }
    catch (error) {
        console.error(error);
        message.reply('Houve um erro ao execuar este comando!');
    }

});
*/
client.login(con.token);
