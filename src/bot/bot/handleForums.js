
import { logPageContentChangeRequest, logPageContentChangeSuccessful } from "./logs.js";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from 'discord.js';
import * as PageContent from '../../server/utils/page-content.js';
import { UserDatabase } from './user-database.js';

export async function showModal(i, id) {

    const pageId = UserDatabase.getPageId(i.user.id);
    if (pageId === undefined) {
        await i.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Page Content Change Failed")
                .setColor(0xddddff)
                .setDescription("You haven't connected your page yet, please use `/connect` first.")
                .setTimestamp()
                .setFooter({ text: "If anything is wrong, contact @winterscode" })], ephemeral: true
        });
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
    // await initializeChangeContentChain(i.user);

    let modal = new ModalBuilder()
        .setCustomId(`changePageContentModal-${id}`)
        .setTitle("Change Page Content | Images Must Be Links!");

    console.log(modal);
    let j = 0;
    for (const m in data) {
        if (j >= 5 + id - 1) break;
        j += 1;
        if (j < id - 1) continue;
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

export async function modalFinished(i) {
    await logPageContentChangeRequest(i.client, i.user);

    let e = new EmbedBuilder()
        .setTitle("Page Content Changed Form Completed")
        .setDescription("Thank you for filling out the form, your page should update shortly.")
        .setColor(0xddddff)
        .setTimestamp()
        .setFooter({text: "Please report any problems to @winterscode"});
    await i.reply({ embeds: [e], ephemeral: true });

    const pageId = UserDatabase.getPageId(i.user.id);
    if (pageId === undefined) {
        await i.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Page Content Change Failed")
                .setColor(0xddddff)
                .setDescription("You haven't connected your page yet, please use `/connect` first.")
                .setTimestamp()
                .setFooter({ text: "If anything is wrong, contact @winterscode" })], ephemeral: true
        });
        return;
    }

    let fields = i.fields.fields;
    let jsonResult = PageContent.getPageContent(pageId);
    fields.each((j) => {
        jsonResult[j.customId] = j.value;
    });
    await PageContent.setPageContent(pageId, jsonResult);
    await logPageContentChangeSuccessful(i.client, i.user);
}