
// Load modules
import { ActivityType, Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { loadCommands, registerCommands } from './bot/prelude.js';
import { modalFinished } from './bot/handleForums.js';
import fs from 'fs/promises';
import path from 'path';

export async function startBot() {
    // Load the bot's token
    let TOKEN = process.env.TOKEN;
    let GUILD = process.env.GUILD;
    let BOTID = process.env.BOTID;

    if (!TOKEN || !GUILD || !BOTID) {
        let text;
        
        try {
            text = await fs.readFile(path.join(process.cwd(), 'secrets.json'));;
        } catch (err) {
            console.log("Missing Discord bot token");

            return;
        }

        const secrets = JSON.parse(text);

        TOKEN = secrets.TOKEN;
        GUILD = secrets.GUILD;
        BOTID = secrets.BOTID;
    }

    // Create the client
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    // Create command getter
    client.commands = new Collection();

    // Load all of the commands
    const commands = await loadCommands(client);
    await registerCommands(commands, TOKEN, GUILD, BOTID);

    // When the bot gets an Interaction
    client.on(Events.InteractionCreate, async interaction => {
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        } else if (interaction.isModalSubmit()) {
            await modalFinished(interaction);
        }
    })

    // When the bot is ready
    client.once(Events.ClientReady, readyClient => {
        readyClient.user.setPresence({
            activities: [{
                name: 'bits and bytes',
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/discord'
            }],
            status: 'online'
        })
        console.log(`Ready, logged in as ${readyClient.user.tag}`);
    });

    // Log in to the client
    client.login(TOKEN);
}