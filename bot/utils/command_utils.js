const fs = require('node:fs');
const path = require('node:path');
// https://discordjs.guide/creating-your-bot/command-handling.html#command-categories
// Get all commands and return them as a list
const getAllCommands = (basedir) => {
    const commands = [];
    const foldersPath = path.join(basedir, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    commandFolders.forEach((folder) => {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        commandFiles.forEach((file) => {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                commands.push(command);
            }
            else {
                console.log(`[WARN] The command in ${filePath} is missing "data" or "execute", skipping.`);
            }
        });
    });
    return commands;
};

module.exports = {
    getAllCommands: getAllCommands,
};