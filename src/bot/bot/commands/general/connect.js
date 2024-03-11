
import { SlashCommandBuilder } from 'discord.js';
import { UserDatabase } from '../../user-database.js';

export const data = new SlashCommandBuilder()
    .setName('connect-page')
    .setDescription('Connect your Discord account to your page!')
    .addStringOption(o => o
        .setRequired(true)
        .setName('author')
        .setDescription('The author of the page, first name, last initial | NOT CASE SENSITIVE'));

export async function execute(interaction) {

    let pageId = interaction.options.getString('author').toLowerCase().replaceAll(' ', '-');

    await interaction.reply(`Connected <@${interaction.user.id}> to page \`${pageId}\``);
}