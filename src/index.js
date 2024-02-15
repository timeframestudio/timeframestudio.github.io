import express from 'express';
import url from 'url';
import fs from 'fs/promises';
import { ProjectLoader } from './project/project-loader.js';
import { HomeLoader } from './home/home-loader.js';

const root = url.fileURLToPath(new URL('..', import.meta.url));

const app = express();

const projectLoader = new ProjectLoader();
await projectLoader.setup();

const homeLoader = new HomeLoader(projectLoader.getProjectSummaries());
await homeLoader.setup();

app.get('/prototypes', (req, res) => {
    res.sendFile('./dist/prototypes/index.html', { root }); 
});

app.get('/prototypes/:id', async (req, res) => {
    if (!isSafePath(req.params.id)) {
        res.status(400).send('Error 400: Invalid prototype path');
    }

    let filePath = `./dist/prototypes/${req.params.id}.html`;

    try {
        await fs.access(filePath);
    } catch (err) {
        res.status(404).send('Error 404: Prototype not found');
        return;
    }

    res.sendFile(filePath, { root });
});

app.use('/assets', express.static('./dist/assets'));
app.use('/css', express.static('./dist/css'));
app.use('/scripts', express.static('./dist/scripts'));

app.get('/', (req, res) => {
    res.send(homeLoader.getHomeHTML());
});

app.get('/projects/:projectId', (req, res) => {
    if (!isSafePath(req.params.projectId)) {
        res.status(400).send('Error 400: Invalid project path');
        return;
    }

    let html = projectLoader.projects.get(req.params.projectId);

    if (html) {
        res.send(html);
    } else {
        res.status(404).send('Error 404: Project not found');
    }
});

app.get('/assets/project/:projectId/:path', async (req, res) => {
    if (!isSafePath(req.params.projectId)) {
        res.status(400).send('Error 400: Invalid project path');
        return;
    }

    let filePath = `./projects/${req.params.projectId}/${req.params.path}`;

    if (req.params.path == 'project.json' || req.params.path == 'project.js') {
        res.status(403).send('Error 403: Forbidden');

        return;
    }

    try {
        await fs.access(filePath);
    } catch (err) {
        res.status(404).send('Error 404: Project asset does not exist');
        return;
    }

    res.sendFile(filePath, { root });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

function isSafePath(path) {
    return typeof path == 'string' && /^[a-zA-Z0-9\-]+$/.test(path);
}