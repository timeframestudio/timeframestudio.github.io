import { PageRouter } from "../../../src/server/pages/page-router.js";
import { SimplePage } from "../../../src/server/utils/simple-page.js";

const router = new PageRouter();

router.addPage('/', new SimplePage({
    artwork: ['The_Secrets_of_Bastets_Temple.png']
}));

export default router;