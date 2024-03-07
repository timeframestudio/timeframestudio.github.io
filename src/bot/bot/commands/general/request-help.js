
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import config from '../../../config.json' assert { type: 'json' };

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
        .setRequired(true));

export async function execute(interaction) {

    let departmentPing = `<@&${config.roles[interaction.options.getString('department')]}>`;
    
    const embed = new EmbedBuilder()
        .setColor(0xddddff)
        .setTitle('Help Request')
        .setDescription(`Help has been requested for ${departmentPing} by <@${interaction.user.id}>.\n\n> "${interaction.options.getString('summary')}"`)
        .setTimestamp()
        .setFooter({ text: "If anything is wrong, contact @winterscode" });

    await interaction.client.channels.cache.get(config.reqsChannel).send({ content: `||${departmentPing}<@${interaction.user.id}>||`, embeds: [embed] });

    const embed2 = new EmbedBuilder()
        .setColor(0xddddff)
        .setTitle('Help Request Sent')
        .setDescription(`You have requested help from the ${departmentPing} department. Please wait until a member can assist you.`)
        .setTimestamp()
        .setFooter({ text: "If anything is wrong, contact @winterscode" });

    await interaction.reply({ embeds: [embed2], ephemeral: true });
}
