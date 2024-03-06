
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('connect-page')
    .setDescription('Connect your Discord account to your page!')
    .addStringOption(o => o
        .setRequired(true)
        .setName('Author')
        .setDescription('The author of the page | NOT CASE SENSITIVE'));

export async function execute(interaction) {
    await interaction.reply('Connected!');
}