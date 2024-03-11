
import { ActionRowBuilder, Events, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from 'discord.js';
import config from '../../../config.json' assert { type: 'json' };
import { logLayoutChangeRequest } from '../../logs.js';
import * as PageContent from '../../../../server/utils/page-content.js';
import { UserDatabase } from '../../user-database.js';

export const data = new SlashCommandBuilder()
    .setName('change-page')
    .setDescription('Change your page on the website.')
    .addSubcommand(subcommand => subcommand
            .setName('content')
            .setDescription('Change your page\'s content'))
    .addSubcommand(subcommand => subcommand
            .setName('title')
            .setDescription('Change the title of your page')
            .addStringOption(option => option
                    .setName('new_title')
                    .setDescription('The new title for your page.')
                    .setRequired(true)))
    .addSubcommand(subcommand => subcommand
            .setName('layout')
            .setDescription('Lets the website team know you want to change your page\'s layout'));

async function executeContentSubcommand(i) {
    const modal = new ModalBuilder()
        .setCustomId('changePageContentModal')
        .setTitle("Change Page Content | Images Must Be Links!");
    
    const pageId = UserDatabase.getPageId(i.user.id);
    if (pageId === undefined) {
        await i.reply({embeds: [new EmbedBuilder()
            .setTitle("Page Content Change Failed")
            .setColor(0xddddff)
            .setDescription("You haven't connected your page yet, please use `/connect` first.")
            .setTimestamp()
            .setFooter({ text: "If anything is wrong, contact @winterscode" })], ephemeral: true});
        return;
    }

    const data = PageContent.getPageContent(pageId);
    
    if (data === null || data === undefined) {
        await i.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Page Content Change Failed")
                .setColor(0xddddff)
                .setDescription("Your page doesn't exist; please wait a few minutes and try again. If this persists, contact someone in the website department.")
                .setTimestamp()
                .setFooter({ text: "If anything is wrong, contact @winterscode" })], ephemeral: true
        });
        return;
    }

    for (const m in data) {
        let text = new TextInputBuilder()
            .setCustomId(m)
            .setLabel(m)
            .setRequired(true)
            .setValue(data[m])
            .setStyle(TextInputStyle.Paragraph);
        let ar = new ActionRowBuilder().addComponents(text);
        modal.addComponents(ar);
    }

    await i.showModal(modal);
}
async function executeTitleSubcommand(i) {
    await i.reply(`Your page has been renamed to "${i.options.getString('new_title')}", please allow it a few minutes to update.\nReport any issues to the website development team.`);
}
async function executeLayoutSubcommand(i) {
    logLayoutChangeRequest(i.client, i.user);
    const embed = new EmbedBuilder()
        .setColor(0xddddff)
        .setTitle('Layout Change Request')
        .setDescription(`Layout change has been requested by <@${i.user.id}>.`)
        .setTimestamp()
        .setFooter({ text: "If anything is wrong, contact @winterscode" });
    await i.client.channels.cache.get(config.reqsChannel).send({ content: `||<@&${config.roles.web}><@${i.user.id}>||`, embeds: [embed], ephemeral: true });
    const embed2 = new EmbedBuilder();
    await i.reply('The website team has been notified; please wait for a response.');
}

export async function execute(interaction) {
    if (interaction.options.getSubcommand() === 'content')
        await executeContentSubcommand(interaction);
    else if (interaction.options.getSubcommand() === 'title')
        await executeTitleSubcommand(interaction);
    else if (interaction.options.getSubcommand() === 'layout')
        await executeLayoutSubcommand(interaction);
    else {
        let e = new EmbedBuilder().setTitle("Unknown Subcommand").setTimestamp().setFooter("If anything is wrong, contact @winterscode");
        await interaction.reply({ embeds: [e], ephemeral: true });
    }
}