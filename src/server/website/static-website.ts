import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { AboutPage } from '../pages/about-page.js';
import { ErrorPage } from '../pages/error-page.js';
import { HomePage } from '../pages/home-page.js';
import { PageLoader } from '../project/page-loader.js';
import { setupInterface } from '../utils/page-content.js';
import { Website } from './website.js';

export class StaticWebsite implements Website {
    private _root = url.fileURLToPath(new URL('..', import.meta.url));
    
    set root(value: string) {
        this._root = value;
    }

    private _output = "build";

    set output(value: string) {
        this._output = value;
    }
    
    async setup() {
        const pageLoader = new PageLoader();
        await pageLoader.load();

        const homePage = new HomePage();
        await homePage.setupWebpage();

        const aboutPage = new AboutPage();
        await aboutPage.setupWebpage();
        
        const errorPage = new ErrorPage();
        await errorPage.setupWebpage();

        setupInterface(pageLoader);

        try {
            await fs.rm(this._output, { recursive: true });
        } catch (err) {
        }

        await fs.mkdir(this._output);

        await fs.cp('./public/assets', path.join(this._output, 'assets'), { recursive: true });
        await fs.cp('./public/css', path.join(this._output, 'css'), { recursive: true });
        await fs.cp('./public/scripts', path.join(this._output, 'scripts'), { recursive: true });

        await fs.writeFile(path.join(this._output, 'index.html'), homePage.getPageHTML());
        await fs.writeFile(path.join(this._output, 'about.html'), aboutPage.getPageHTML());

        await fs.mkdir(path.join(this._output, 'assets', 'project'));
        await fs.mkdir(path.join(this._output, 'projects'));

        for (const [ id, project ] of pageLoader.getProjects()) {
            try {
                await fs.cp(path.join(project.getPageResources().getFilePath(), 'assets'), path.join(this._output, 'assets', 'project', id), { recursive: true });
            } catch (err) {
                if (err.code != 'ENOENT') throw err;
            }

            await fs.mkdir(path.join(this._output, 'projects', id));

            const router = project.getPageRouter();

            for (let [ name, page ] of router.getPages()) {
                if (name == '/' || name == '') name = 'index';

                await fs.writeFile(path.join(this._output, 'projects', id, `${name}.html`), page.getPageHTML());
            }
        }

        await fs.writeFile(path.join(this._output, 'projects.json'), JSON.stringify(pageLoader.getOutlineSummaries()));

        await fs.mkdir(path.join(this._output, 'assets', 'departments'));
        await fs.mkdir(path.join(this._output, 'about'));

        for (const [ id, department ] of pageLoader.getDepartments()) {
            try {
                await fs.cp(path.join(department.getPageResources().getFilePath(), 'assets'), path.join(this._output, 'assets', 'departments', id), { recursive: true });
            } catch (err) {
                if (err.code != 'ENOENT') throw err;
            }

            await fs.mkdir(path.join(this._output, 'about', id));

            const router = department.getPageRouter();

            for (let [ name, page ] of router.getPages()) {
                if (name == '/' || name == '') name = 'index';

                await fs.writeFile(path.join(this._output, 'about', id, `${name}.html`), page.getPageHTML());
            }
        }

        console.log(`Static website built to ${this._output}`);
        console.log(` * Run 'npx serve ${this._output}' to view the website`);
    }
}