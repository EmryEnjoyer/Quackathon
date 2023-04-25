const { QuackathonService } = require('api/dist/Quackathon/quackathon.service');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quackathon')
        .setDescription('Quackathon parent command')
        // First subgroup for all the setup commands
        .addSubcommandGroup(group =>
            group
                .setName('setup')
                .setDescription('Commands for setting up a new quackathon')
                .addSubcommand(command =>
                    command
                        .setName('boilerplate')
                        .setDescription('Returns quackathon boilerplate message with automatically generated start and end dates'),
                )
                .addSubcommand(command =>
                    command
                        .setName('challenge')
                        .setDescription('Prompt to enter and format quackathon challenge information'),
                )
                .addSubcommand(command =>
                    command
                        .setName('important')
                        .setDescription('Prompt to generate optional "IMPORTANT" message to convey additional information or requirements'),
                )
                .addSubcommand(command =>
                    command
                        .setName('resources')
                        .setDescription('Prompt to append additional resources relating to this quackathon'),
                ),
        )
        // second subgroup for team commands
        .addSubcommandGroup(group =>
            group
                .setName('team')
                .setDescription('Commands pertaining to quackathon teams')
                .addSubcommand(command =>
                    command
                        .setName('create')
                        .setDescription('Create a new quackathon team'),
                ),
        ),
    execute: async (interaction) => {
        const command = interaction.options.getSubcommand();

        switch (command) {
        case 'boilerplate':
            // this is returning an error saying cannot find properties of undefined and links to quackathon.service line 65, which is the error catch block starting at this.logger.error(...etc).
            const newBoilerplate = await QuackathonService.prototype.getBoilerplate();
            await interaction.reply({ content: newBoilerplate });
            break;

        case 'challenge':
            await interaction.reply({ content: 'Challenge text goes here' });
            break;

        case 'important':
            await interaction.reply({ content: 'Important text goes here' });
            break;

        case 'resources':
            await interaction.reply({ content: 'Resources text goes here' });
            break;

        case 'create':
            await interaction.reply({ content: 'team create text goes here' });
            break;
        }
    },
};