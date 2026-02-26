import { ReportService } from '../service/report.services.js';
const service = new ReportService();
export class ReportController {
    async genereatePaymentReport(req, res, next) {
        try {
            const dataBody = req.body;
            const pdfDoc = await service.generatePayment(dataBody);
            const month = new Date().getMonth() + 1;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=relatorio-pagamentos-mes=${month}.pdf`);
            pdfDoc.pipe(res);
            pdfDoc.end();
        }
        catch (error) {
            next(error);
        }
    }
    async genereateStudentReport(req, res, next) {
        console.log('hello word');
    }
}
