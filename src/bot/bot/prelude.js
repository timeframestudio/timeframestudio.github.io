
import path from 'path';
import fs from 'node:fs';
import url from 'node:url';
import { REST, Routes } from 'discord.js';

const commandFolder = url.fileURLToPath(new URL("../bot/commands/", import.meta.url));
const commandFolders = fs.readdirSync(commandFolder);

async function loadOneCommand(client, moduleFolder, file) {
    const filePath = path.join(moduleFolder, file);
    const command = await import(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        return command.data.toJSON();
    } else {
        console.log(`[WARNING] Command at ${filePath} doesn't have the "data" or "execute" properties!`);
    }
}

export async function loadCommands(client) {
    const commands = [];
    for (const folder of commandFolders) {
        const modulePath = path.join(commandFolder, folder);
        const commandFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            commands.push(await loadOneCommand(client, modulePath, file));
        }
    }
    return commands;
}

export async function registerCommands(commands, token, guildId, clientId) {
    const rest = new REST().setToken(token);

    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}