
import config from '../config.json' assert { type: 'json' }; 

function getTime() {
    var d = new Date();
    return d.toLocaleTimeString();
}

export async function logLayoutChangeRequest(client, user) {
    await client.channels.cache.get(config.logsChannel).send(`-- BOT LOG --\nLayout change request:\n* Sender: <@${user.id}>\n* Timestamp: ${getTime()}`);
}

export async function logPageContentChangeRequest(client, user) {
    client.channels.cache.get(config.logsChannel).send(`-- BOT LOG --\nPage content form filled:\n* Sender: <@${user.id}>\n* Timestamp: ${getTime()}\n*Another log will be sent when the page is confirmed to have updated.*`);
}

export async function logPageContentChangeSuccessful(client, user) {
    client.channels.cache.get(config.logsChannel).send(`-- BOT LOG --\nPage content successfully changed:\n* Change requested by: <@${user.id}>\n* Timestamp: ${getTime()}\n*This is a follow-up to the previous page content change request.*`);
}

export async function logPageConnectedToUser(client, user) {
    client.channels.cache.get(config.logsChannel).send(`-- BOT LOG --\nPage connected:\n* Connected to: <@${user.id}>\n* Timestamp: ${getTime()}`);
}