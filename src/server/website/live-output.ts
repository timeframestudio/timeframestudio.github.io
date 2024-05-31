import express from 'express';
import fs from 'fs/promises';
import url from 'url';
import { HomePage } from '../pages/home-page.js';
import { AboutPage } from '../pages/about-page.js';
import { startBot } from '../../bot/index.js';
import { setupInterface } from '../utils/page-content.js';
import { ErrorPage } from '../pages/error-page.js';
import { Output } from './output.js';

export class LiveOutput implements Output {
    private _root = url.fileURLToPath(new URL('..', import.meta.url));
    
    set root(value: string) {
        this._root = value;
    }

    private _port = 3000;

    set port(value: number) {
        this._port = value;
    }
    
    async setup() {
        const app = express();

        const pageLoader = new PageLoader();
        await pageLoader.load();

        const homePage = new HomePage();
        await homePage.setupWebpage();

        const aboutPage = new AboutPage();
        await aboutPage.setupWebpage();
        
        const errorPage = new ErrorPage();
        await errorPage.setupWebpage();

        setupInterface(pageLoader);

        app.get('/prototypes', (req, res) => {
            res.sendFile('./public/prototypes/index.html', { root: this._root }); 
        });

        app.get('/prototypes/:id', async (req, res) => {
            if (!isSafePath(req.params.id)) {
                res.status(400).send('Error 400: Invalid prototype path');
            }

            let filePath = `./public/prototypes/${req.params.id}.html`;

            try {
                await fs.access(filePath);
            } catch (err) {
                res.status(404).send('Error 404: Prototype not found');
                return;
            }

            res.sendFile(filePath, { root: this._root });
        });

        app.use('/assets', express.static('./public/assets'));
        app.use('/css', express.static('./public/css'));
        app.use('/scripts', express.static('./public/scripts'));

        app.get('/', (req, res) => {
            res.send(homePage.getPageHTML());
        });

        app.get('/about', (req, res) => {
            res.send(aboutPage.getPageHTML());
        });

        app.use('/projects', pageLoader.getProjectPageRouter());
        app.use('/assets/project', pageLoader.getProjectAssetRouter());

        app.get('/projects.json', (req, res) => {
            res.json(pageLoader.getOutlineSummaries());
        });

        app.use('/about', pageLoader.getDepartmentPageRouter());
        app.use('/assets/departments', pageLoader.getDepartmentAssetRouter());

        app.get('/*', (req, res) => {
            res.status(404).send(errorPage.getPageHTML());
        });

        app.listen(this._port, () => {
            console.log('Server started on http://localhost:3000');
        });

        function isSafePath(path: string) {
            return typeof path == 'string' && /^[a-zA-Z0-9\-]+$/.test(path);
        }

        startBot();
    }
}