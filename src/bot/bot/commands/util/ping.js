
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping the bot');

export async function execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor(0xddddff)
        .setTitle("Pong!")
        .setTimestamp()
        .setFooter({ text: "If anything is wrong, contact @winterscode" });

    await interaction.reply({ embeds: [embed] });
}