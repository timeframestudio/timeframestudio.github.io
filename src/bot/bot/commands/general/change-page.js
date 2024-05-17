
import { ActionRowBuilder, Events, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from 'discord.js';
import { showModal } from '../../handleForums.js';

export const messages = [
    "Initializing the page change form. Please type `y` if you wish to continue and `n` if not. This process will be ended if you type anything else.",
    "Thank you for filling out this form. Please give it a few minutes to update the webpage."
];

export const data = new SlashCommandBuilder()
    .setName('change-page')
    .setDescription('Change your page on the website.');
    // .addSubcommand(subcommand => subcommand
    //         .setName('personal')
    //         .setDescription('Change your page\'s content'))
    // .addSubcommand(subcommand => subcommand
    //         .setName('title')
    //         .setDescription('Change the title of your page')
    //         .addStringOption(option => option
    //                 .setName('new_title')
    //                 .setDescription('The new title for your page.')
    //                 .setRequired(true)));

async function makeNewModal(id) {
    return new ModalBuilder()
        .setCustomId(`changePageContentModal-${id}`)
        .setTitle("Change Page Content | Images Must Be Links!");
}

async function executeContentSubcommand(i) {
    
    await showModal(i, 1);
}
async function executeTitleSubcommand(i) {
    await i.reply(`Your page has been renamed to "${i.options.getString('new_title')}", please allow it a few minutes to update.\nReport any issues to the website development team.`);
}

async function executeDepartmentSubcommand(i) {
    await i.reply('Form to change the department page\'s content');
}

export async function execute(interaction) {
    await executeContentSubcommand(interaction);
    // if (interaction.options.getSubcommand() === 'personal')
    //     await executeContentSubcommand(interaction);
    // else if (interaction.options.getSubcommand() === 'department')
    //     await executeDepartmentSubcommand(interaction);
    // else if (interaction.options.getSubcommand() === 'title')
    //     await executeTitleSubcommand(interaction);
    // else {
    //     let e = new EmbedBuilder().setTitle("Unknown Subcommand").setTimestamp().setFooter("If anything is wrong, contact @winterscode");
    //     await interaction.reply({ embeds: [e], ephemeral: true });
    // }
}