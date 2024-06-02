import { PageRouter } from "../../../src/server/pages/page-router.js";
import { SimplePage } from "../../../src/server/utils/simple-page.js";

const router = new PageRouter();

router.addPage('/', new SimplePage({
    artwork: [ 'artwork/art.jpeg' ]
}));

export default router;