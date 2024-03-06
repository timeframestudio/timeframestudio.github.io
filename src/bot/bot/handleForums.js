
import { logPageContentChangeRequest } from "./logs.js";

export async function modalFinished(i) {
    await logPageContentChangeRequest(i.client, i.user);
    await i.reply("Thank you for filling out the form, your page should update shortly. \nReport any problems to the website department.");
}