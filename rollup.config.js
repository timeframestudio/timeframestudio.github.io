import typescript from '@rollup/plugin-typescript';
import fs from 'fs/promises';
import path from 'path';
import { cleandir } from "rollup-plugin-cleandir";

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
    external: [ 'express', 'fs/promises', 'url', 'jsdom', 'path', 'pretty', 'process' ],
    plugins: [ typescript(), cleandir() ]
};

function getChunkName(id) {
    let relativePath = path.relative(path.join(process.cwd()), id);

    let splitPath = relativePath.split(path.sep);

    if (splitPath[0] == 'projects') {
        return path.join('projects', splitPath[1]);
    } else {
        return 'server';
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