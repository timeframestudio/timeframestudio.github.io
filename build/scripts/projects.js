let projectSummaries = await fetchProjectSummaries();

export async function getProjectSummaries() {
    if (!projectSummaries) {
        throw new Error("Project summaries not injected properly. Is the Node.js server running?");
    }

    return projectSummaries;
}

async function fetchProjectSummaries() {
    const response = await fetch("/projects.json");
    const data = await response.json();

    return data;
}