import { ajax } from './ajax.js';
import { reportUrls } from './reportUrls.js';

class ReportApi {
    getReports(filters, callback) {
        ajax.get(reportUrls.getReports(filters), callback);
    }

    getReportById(id, callback) {
        ajax.get(reportUrls.getReportById(id), callback);
    }

    createReport(data, callback) {
        ajax.post(reportUrls.createReport(), data, callback);
    }

    updateReportById(id, data, callback) {
        ajax.patch(reportUrls.updateReportById(id), data, callback);
    }

    deleteReportById(id, callback) {
        ajax.delete(reportUrls.deleteReportById(id), callback);
    }
}

export const reportApi = new ReportApi();