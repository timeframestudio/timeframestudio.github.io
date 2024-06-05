import { cursorTo } from "readline";

export function rewriteLine(text: string) {
    clearLine();
    process.stdout.write(text);
}

export function rewriteLineWithProgress(text: string, progress: number, total: number) {
    clearLine();

    let progressText = text.padEnd(64) + `${(progress / total * 100).toFixed(2)}%`.padStart(7);
    let progressIndex = Math.floor(progress / total * progressText.length);

    process.stdout.write("[\x1b[100m" + progressText.slice(0, progressIndex) + "\x1b[0m");
    process.stdout.write(progressText.slice(progressIndex) + "]");
}

export function blankLine() {
    process.stdout.write("\n");
}

export function clearLine() {
    cursorTo(process.stdout, 0);
}