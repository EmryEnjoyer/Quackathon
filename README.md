# Quackathon


# Setting up environment variables
In the bot directory, create a file called `.env` and fill it with the following template:
```
DISCORD_TOKEN = <Your Token Here>
CLIENT_ID = <Your Client ID here>
GUILD_ID = <Your Guild ID here>
```
# Setting up launch.json

To set up launch.json, use the following template:
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
    {
        "command": "yarn workspace api start",
        "name": "Start API",
        "request": "launch",
        "type": "node-terminal"
    },
    {
        "type": "node",
        "request": "launch",
        "name": "Bot",
        "skipFiles": [
            "<node_internals>/**"
        ],
        "program": "${workspaceFolder}\\bot\\index.js",
        "env": {
            "DISCORD_TOKEN": "<Your token here>",
            "CLIENT_ID": "<Client ID here>",
            "GUILD_ID": "<Guild ID here>"
        }
    }
    ]
}
```

This will allow you to debug properly.

