
// Load all the needed modules to start the bot
import { ActivityType, Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { loadCommands, registerCommands } from './bot/prelude.js';
import { modalFinished } from './bot/handleForums.js';
import fs from 'fs/promises';
import path from 'path';
import './bot/user-database.js';

// Function to start the bot
export async function startBot() {

    // Load the bot's token, bot's ID, and the guild ID
    let TOKEN = process.env.TOKEN;
    let GUILD = process.env.GUILD;
    let BOTID = process.env.BOTID;

    // If any of these do not exist
    if (!TOKEN || !GUILD || !BOTID) {

        // Create a base text object
        let text;
        
        // Try to load the bot token from the secrets
        try {
            text = await fs.readFile(path.join(process.cwd(), 'secrets.json'));;

        // Otherwise, exit the program and ignore the bot
        } catch (err) {
            console.log("Missing Discord bot token");

            return;
        }

        // Get the secrets from that JOSN file
        const secrets = JSON.parse(text);

        // Set all the values to the secrets
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

        // If it is a slash command
        if (interaction.isChatInputCommand()) {

            // Get the command from the interaction
            const command = interaction.client.commands.get(interaction.commandName);

            // If the command doesn't exist, skip out of this method
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            // Try to run the command
            try {
                await command.execute(interaction);
            
            // If there is an error, let the user know that and break out
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        
        // If you are submitting a fomr, then recieve the inputs
        } else if (interaction.isModalSubmit()) {
            await modalFinished(interaction);
        }
    })

    // When the bot is ready
    client.once(Events.ClientReady, readyClient => {
        readyClient.user.setPresence({
            activities: [{
                name: '1s and 0s',
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