# Quackathon

## Description
Quackathon is a bot for managing quackathons, quackathon submissions, and quackathon teams.

We unfortunately didn't get to get a lot done this quackathon, but we hope to do more next time!

Features:
/quackathon setup boilerplate <boilerplate> - sets the boilerplate for the quackathon bot
/quackathon setup create - creates a new quackathon
/quackathon setup start - Starts the quackathon
/quackathon setup stop - stops the quackathon - announces winning team
/quackathon team create - creates a new team instance
/quackathon team invite <user> - invites a user
/quackathon team remove <user> - removes a user from a team
/quackathon team set-repo <link> - sets the repo link for a quackathon team
/quackathon team set-deploy <link> - sets the deploy link for a quackathon team
/quackathon team submit - sets the team's status to submitted

/quackathon team <teamId> set-winner - sets a team as a winner

## Conventions
When a quackathon is referenced as "the quackathon", then it is the latest active quackathon

Commit messages follow the conventional commit standard

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

