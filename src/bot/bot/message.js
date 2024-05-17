
import { messages } from './commands/general/change-page.js';

export async function handleDirectMessage(client, msg) {
    if (msg.author.id == client.user.id) return;
    let last = await msg.channel.messages.fetch({ limit: 2, cache: false })
        .then(m => m.filter((i) => i.author.id = client.user.id).first().content);
    let lastId = messages.indexOf(last);
    await msg.channel.send(messages.at((lastId + 1) % messages.length))
}