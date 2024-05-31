#!/usr/bin/env node

import { StaticOutput, Website } from "../dist/server.js";

const website = new Website();

website.setup();

const output = new StaticOutput();

output.setup();