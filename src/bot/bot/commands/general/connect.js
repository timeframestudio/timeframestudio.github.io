
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { UserDatabase } from '../../user-database.js';
import { logPageConnectedToUser } from '../../logs.js';

export const data = new SlashCommandBuilder()
    .setName('connect-page')
    .setDescription('Connect your Discord account to your page!')
    .addStringOption(o => o
        .setRequired(true)
        .setName('author')
        .setDescription('The author of the page, first name, last initial | NOT CASE SENSITIVE'));

export async function execute(interaction) {

    let pageId = interaction.options.getString('author').toLowerCase().replaceAll(' ', '-');

    UserDatabase.setPageId(interaction.user.id, pageId);

    let text = `Connected <@${interaction.user.id}> to page \`${pageId}\``;

    await logPageConnectedToUser(interaction.client, interaction.user)

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle('Page Connected')
            .setColor(0xddddff)
            .setDescription(text)
            .setTimestamp()
            .setFooter({ text: "If anything is wrong, contact @winterscode" })],
        ephemeral: true
    });
}