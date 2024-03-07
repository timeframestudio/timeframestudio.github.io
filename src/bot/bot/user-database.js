import fs from 'fs/promises';

export const UserDatabase = {
    users: new Map(),

    async loadDatabase() {
        let text;
        
        try {
            text = await fs.readFile(new URL('../data/users.json', import.meta.url));
        } catch (err) {
            try {
                await fs.mkdir(new URL('../data/', import.meta.url));
            } catch (err) {}

            try {
                await fs.writeFile(new URL('../data/users.json', import.meta.url), '{}');
            } catch (err) {
                console.error("Failed to create or read UserDatabase.");

                return;
            }

            return;
        }

        const users = JSON.parse(text);

        for (const [ userId, pageId ] of Object.entries(users)) {
            UserDatabase.users.set(userId, pageId);
        }
    },

    getPageId(userId) {
        return UserDatabase.users.get(userId);
    },

    setPageId(userId, pageId) {
        UserDatabase.users.set(userId, pageId);

        UserDatabase.saveDatabase();
    },

    async saveDatabase() {
        console.log("Saving UserDatabase: " + UserDatabase.users.size + " users.");

        const users = {};

        for (const [ userId, pageId ] of UserDatabase.users) {
            console.log(userId, pageId);
            users[userId] = pageId;
        }

        await fs.writeFile(new URL('../data/users.json', import.meta.url), JSON.stringify(users));
    }
}

await UserDatabase.loadDatabase();