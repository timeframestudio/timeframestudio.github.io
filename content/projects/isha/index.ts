import { PageRouter } from "../../../src/server/pages/page-router.js";
import { SimplePage } from "../../../src/server/utils/simple-page.js";

const router = new PageRouter();

router.addPage('/', new SimplePage({
    artwork: [ 'storyboard1.png', 'poster.png', 'scraficetorebel.png', 'scraficetorebel2.png']
}));

export default router;