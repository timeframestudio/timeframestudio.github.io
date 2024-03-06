
// Load modules
import { ActivityType, Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { loadCommands, registerCommands } from './bot/prelude.js';
import { modalFinished } from './bot/handleForums.js';
(await import('dotenv')).config();

// Load the bot's token
const TOKEN = process.env.TOKEN;
const GUILD = process.env.GUILD;
const BOTID = process.env.BOTID;

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
