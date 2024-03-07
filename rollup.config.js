import typescript from '@rollup/plugin-typescript';
import fs from 'fs/promises';
import path from 'path';
import { cleandir } from "rollup-plugin-cleandir";
import json from "@rollup/plugin-json";

let input = [];

const projectDirectories = await getSubdirectories('projects');

for (const directory of projectDirectories) {
    try {
        await fs.access(path.join('projects', directory, 'index.ts'));
    } catch (error) {
        continue;
    }

    input.push(path.join('projects', directory, 'index.ts'));
}

input.push('src/server/index.ts');
input.push('src/bot/index.js');

const commandFiles = await getFiles('src/bot/bot/commands');

for (const subpath of commandFiles) {
    const file = path.join('src/bot/bot/commands', subpath);

    input.push(file);
}

export default {
    input,
    output: {
        dir: 'dist',
        entryFileNames: (chunkInfo) => {
            return getChunkName(chunkInfo.facadeModuleId) + '.js';
        },
        format: 'es',
        sourcemap: true,
        manualChunks: (id) => {
            return getChunkName(id);
        }
    },
    external: [ 'express', 'fs/promises', 'url', 'jsdom', 'path', 'pretty', 'process', 'discord.js' ],
    plugins: [typescript(), cleandir(), json() ]
};

function getChunkName(id) {
    let relativePath = path.relative(path.join(process.cwd()), id);

    let splitPath = relativePath.split(path.sep);

    console.log(splitPath);

    if (splitPath[0] == 'projects') {
        return path.join('projects', splitPath[1]);
    } else if (splitPath[0] == 'src' && splitPath[1] == 'bot' && splitPath[2] == 'bot' && splitPath[3] == 'commands') {
        let subpath = splitPath.slice(3);
        let lastItem = subpath[subpath.length - 1];

        subpath[subpath.length - 1] = lastItem.slice(0, lastItem.indexOf('.'));

        return path.join('bot', ...subpath);
    } else if (splitPath[0] == 'src') {
        return splitPath[1];
    }
}
 
async function getSubdirectories(directory, _basePath = undefined) {
    _basePath = _basePath ?? directory;

    const files = await fs.readdir(directory, { withFileTypes: true });

    let output = [];

    for (const file of files) {
        if (file.isDirectory()) {
            let subpath = path.join(directory, file.name);
            let subfiles = await getSubdirectories(subpath, _basePath);

            output.push(...subfiles);
            output.push(path.relative(_basePath, subpath));
        }
    }

    return output;
}

async function getFiles(directory, _basePath = undefined) {
    _basePath = _basePath ?? directory;

    const files = await fs.readdir(directory, { withFileTypes: true });

    let output = [];

    for (const file of files) {
        let subpath = path.join(directory, file.name);

        if (file.isDirectory()) {
            let subfiles = await getFiles(subpath, _basePath);

            output.push(...subfiles);
        } else {
            output.push(path.relative(_basePath, subpath));
        }
    }

    return output;
}