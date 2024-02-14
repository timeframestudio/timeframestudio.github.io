import express from 'express';
import url from 'url';
import fs from 'fs/promises';

const root = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

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
    res.redirect('/prototypes');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

function isSafePath(path) {
    return typeof path == 'string' && /^[a-zA-Z0-9\-]+$/.test(path);
}