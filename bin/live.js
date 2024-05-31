#!/usr/bin/env node

import { LiveOutput, Website } from "../dist/server.js";

const website = new Website();

website.setup();

const output = new LiveOutput();

output.setup();