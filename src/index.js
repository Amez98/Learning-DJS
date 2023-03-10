import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN);
client.on('ready', () => {console.log(`${client.user.tag} has logged in!`);});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        interaction.reply({ content: 'https://tenor.com/view/senko-gif-19340174'});
    }
});

async function main() {
    const commands = [
    {
        name: 'senko',
        description: 'Will send Senko to listen to you', 
    },
];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });

        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}
