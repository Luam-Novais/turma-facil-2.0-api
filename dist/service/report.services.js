import { generateReportPayment } from '../utils/generatePDF.js';
export class ReportService {
    generatePayment(data) {
        try {
            return generateReportPayment(data);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async generateStudents(data) { }
}
