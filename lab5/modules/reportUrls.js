class ReportUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getReports(filters = {}) {
        const url = new URL(`${this.baseUrl}/reports`);

        if (filters.title) {
            url.searchParams.set('title', filters.title);
        }

        if (filters.category) {
            url.searchParams.set('category', filters.category);
        }

        if (filters.status) {
            url.searchParams.set('status', filters.status);
        }

        return url.toString();
    }

    getReportById(id) {
        return `${this.baseUrl}/reports/${id}`;
    }

    createReport() {
        return `${this.baseUrl}/reports`;
    }

    updateReportById(id) {
        return `${this.baseUrl}/reports/${id}`;
    }

    deleteReportById(id) {
        return `${this.baseUrl}/reports/${id}`;
    }
}

export const reportUrls = new ReportUrls();