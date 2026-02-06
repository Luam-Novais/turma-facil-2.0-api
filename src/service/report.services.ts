import { Student } from '../types/students.js';
import { generateReportPayment } from '../utils/generatePDF.js';

interface TableBodyPayment {
  name: string;
  data: string;
  forma: string;
  value: string;
  reason: string;
}

export class ReportService {
  generatePayment(data: TableBodyPayment[]) {
    try {
      return generateReportPayment(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async generateStudents(data: Student[]) {}
}
