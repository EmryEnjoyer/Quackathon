const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { getAllCommands } = require('./utils/command_utils.js');

const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const commands = getAllCommands(__dirname).map((command) => command.data.toJSON());
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();