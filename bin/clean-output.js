#!/usr/bin/env node

import fs from "fs/promises";

try {
    await fs.rm("dist", { recursive: true, force: true });
} catch (err) {
    if (err.code !== "ENOENT") {
        console.error(err);
    }
}

try {
    await fs.rm("build", { recursive: true, force: true });
} catch (err) {
    if (err.code !== "ENOENT") {
        console.error(err);
    }
}