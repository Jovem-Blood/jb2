const fs = require('fs');

module.exports = {
    start({ client, discord, con }) {
        client.commands = new discord.Collection();
        const prefix = con.prefix;

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../../commands/${file}`);
            client.commands.set(command.name, command);
        }
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
    },
};