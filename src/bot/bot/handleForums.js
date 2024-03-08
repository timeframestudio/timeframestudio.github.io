
import { logPageContentChangeRequest, EmbedBuilder } from "./logs.js";

export async function modalFinished(i) {
    await logPageContentChangeRequest(i.client, i.user);

    let e = new EmbedBuilder()
        .setTitle("Page Content Changed Form Completed")
        .setDescription("Thank you for filling out the form, your page should update shortly.")
        .setColor(0xddddff)
        .setTimestamp()
        .setFooter("Please report any problems to @winterscode");
    await i.reply({ embeds: [e], ephemeral: true });
}