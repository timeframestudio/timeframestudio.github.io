
import config from '../config.json' assert { type: 'json' }; 

function getTime() {
    var d = new Date();
    return d.toLocaleTimeString();
}

export async function logLayoutChangeRequest(client, user) {
    await client.channels.cache.get(config.logsChannel).send(`-- UNUSED --\nLayout change request:\n* Sender: <@${user.id}>\n* Timestamp: ${getTime()}`);
}

export async function logPageContentChangeRequest(client, user) {
    client.channels.cache.get(config.logsChannel).send(`<@${user.id}>'s page content form filled at ${getTime()}`);
}

export async function logPageContentChangeSuccessful(client, user) {
    client.channels.cache.get(config.logsChannel).send(`<@${user.id}>'s page content successfully changed at ${getTime()}`);
}

export async function logPageConnectedToUser(client, user) {
    client.channels.cache.get(config.logsChannel).send(`Page connected to <@${user.id}> at ${getTime()}`);
}