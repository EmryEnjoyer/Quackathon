const { handleCommand } = require('./command_handler.js');
const { getAllCommands } = require('./utils/command_utils.js');

// https://discordjs.guide/creating-your-bot/main-file.html#running-your-application
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commands = getAllCommands(__dirname);
commands.forEach((command) => client.commands.set(command.data.name, command));

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await handleCommand(interaction);
    }
    else {
        return;
    }
});
client.login(process.env.DISCORD_TOKEN);