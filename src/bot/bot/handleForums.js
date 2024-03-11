
import { logPageContentChangeRequest, logPageContentChangeSuccessful } from "./logs.js";
import { EmbedBuilder } from "discord.js";
import * as PageContent from '../../server/utils/page-content.js';
import { UserDatabase } from './user-database.js';

export async function modalFinished(i) {
    await logPageContentChangeRequest(i.client, i.user);

    let e = new EmbedBuilder()
        .setTitle("Page Content Changed Form Completed")
        .setDescription("Thank you for filling out the form, your page should update shortly.")
        .setColor(0xddddff)
        .setTimestamp()
        .setFooter({text: "Please report any problems to @winterscode"});
    await i.reply({ embeds: [e], ephemeral: true });

    let fields = i.fields.fields;
    let jsonResult = {};
    fields.each((j) => {
        jsonResult[j.customId] = j.value;
    });
    await PageContent.setPageContent(UserDatabase.getPageId(i.user.id), jsonResult);
    await logPageContentChangeSuccessful(i.client, i.user);
}