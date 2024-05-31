import { CachedRouter } from "../../../src/server/pages/cached-router.js";
import { SimplePage } from "../../../src/server/utils/simple-page.js";

const router = new CachedRouter();

router.addPage('/', new SimplePage({
    artwork: [ 'artwork/art.jpeg' ]
}));

export default router;