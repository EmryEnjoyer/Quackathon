// https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files
const handleCommand = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
};


module.exports = {
    handleCommand: handleCommand,
};