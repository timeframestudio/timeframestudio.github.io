
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import helpCommandData from '../../help-config.json' assert { type: "json" }

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help from the bot');

export async function execute(interaction) {

    const fields = [];

    for (const command of helpCommandData.commands) {
        fields.push({
            name: "/" + command.name, value: command.description+"\n", inline: false
        });
    }

    const embed = new EmbedBuilder()
        .setColor(0xddddff)
        .setTitle("Help")
        .setDescription("__Help for all of the commands of the bot__")
        .addFields(...fields)
        .setTimestamp()
        .setFooter({text: "If anything is wrong, contact @winterscode"});

    await interaction.reply({ embeds: [embed], ephemeral: true });
}