import { Router } from "./router.js";
import { WebsiteRouter } from "./website-router.js";

export class Website {
    private router: Router;

    async setup() {
        this.router = new WebsiteRouter();
        await this.router.setup();

        console.log("Website setup complete");
    }

    getRouter() {
        return this.router;
    }
}