#!/usr/bin/env node

import { LiveWebsite } from "../dist/server.js";

const website = new LiveWebsite();

website.setup();