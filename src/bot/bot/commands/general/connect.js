
import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from 'discord.js';
import { UserDatabase } from '../../user-database.js';
import { logPageConnectedToUser } from '../../logs.js';

export const data = new SlashCommandBuilder()
    .setName('connect-page')
    .setDescription('Connect your Discord account to your page!')
    .addUserOption(o => o
        .setRequired(true)
        .setName('user')
        .setDescription('The user to connect to the page')
    )
    .addStringOption(o => o
        .setRequired(true)
        .setName('author')
        .setDescription('The author of the page, in the format "Firstname Lastname" | NOT CASE SENSITIVE'));

export async function execute(interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle("No permissions")
                .setTimestamp()
                .setFooter({ text: "If anything is wrong, contact @winterscode" })
            ],
            ephemeral: true
        });
        return;
    }

    let pageId = interaction.options.getString('author').toLowerCase().replaceAll(' ', '-');
    let user = interaction.options.getUser('user');

    UserDatabase.setPageId(user.id, pageId);

    let text = `Connected <@${user.id}> to page \`${pageId}\``;

    await logPageConnectedToUser(interaction.client, user)

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