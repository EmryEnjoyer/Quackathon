// This is shamelesslyh hstolen from https://discordjs.guide/creating-your-bot/main-file.html#running-your-application

const { Client, Events, GatewayIntentBits} = require('discord.js');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);