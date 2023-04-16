const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
         .setName('ping')
         .setDescription('Gives back user\'s name.'),
    execute: async (interaction) => {
        await interaction.reply(`This command brought to you courtesy of ${interaction.user.username}.`);
    },
}