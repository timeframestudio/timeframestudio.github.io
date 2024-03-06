
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('request-help')
    .setDescription('Request help from a department.')
    .addStringOption(o => o
        .setName('department')
        .setDescription('The department you need help from')
        .setRequired(true)
        .addChoices(
            { name: 'Website Department', value: 'web' },
            { name: 'Art & Design', value: 'art' },
            { name: 'Story Development', value: 'story' },
            { name: 'Historical Research', value: 'history' },
            { name: 'Marketing & Communications', value: 'marcom' }
        ))
    .addStringOption(o => o
        .setName('summary')
        .setDescription('A short, 1-sentence summary of your problem')
        .setRequired(false));

export async function execute(interaction) {
    await interaction.reply('Pong!');
}
