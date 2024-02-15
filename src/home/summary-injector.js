export class SummaryInjector {
    constructor(summaries) {
        this.summaries = summaries;
    }

    injectSummaries(document) {
        const script = document.createElement('script');
        script.innerHTML = `window._projectSummaryData = ${JSON.stringify(this.summaries)};`;
        document.head.appendChild(script);
    }
}