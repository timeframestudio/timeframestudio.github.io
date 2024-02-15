let projectSummaries = null;

export async function loadProjectSummaries() {
    const response = await fetch('/api/projects');
    const data = await response.json();

    projectSummaries = data;
}

export async function getProjectSummaries() {
    if (!projectSummaries) {
        await loadProjectSummaries();
    }

    return projectSummaries;
}