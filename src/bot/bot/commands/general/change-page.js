
import { ModalBuilder, SlashCommandBuilder } from 'discord.js';
import { showModal } from '../../handleForums.js';

export const messages = [
    "Initializing the page change form. Please type `y` if you wish to continue and `n` if not. This process will be ended if you type anything else.",
    "Thank you for filling out this form. Please give it a few minutes to update the webpage."
];

export const data = new SlashCommandBuilder()
    .setName('change-page')
    .setDescription('Change your page on the website.');

async function makeNewModal(id) {
    return new ModalBuilder()
        .setCustomId(`changePageContentModal-${id}`)
        .setTitle("Change Page Content | Images Must Be Links!");
}

async function executeContentSubcommand(i) {
    
    await showModal(i, 1);
}

export async function execute(interaction) {
    await executeContentSubcommand(interaction);
}