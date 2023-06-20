const { SlashCommandBuilder } = require('discord.js');
const { AppService } = require('api/dist/app.service');
const { QuackathonService } = require('api/dist/Quackathon/quackathon.service');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gives back user\'s name.'),
    execute: async (interaction) => {
        const reply = await AppService.prototype.getHello();

        const throwaway = await QuackathonService.prototype.getTest();
        await interaction.reply(`${reply} ${throwaway}.`);
    },
};