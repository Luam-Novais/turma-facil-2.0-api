import { HandlerError } from '../middlewares/handlerError.js';
import { StudentRepository } from '../repository/student.repository.js';
import { mapOfPaymentReasons } from '../utils/mapOfPaymentReason.js';
const studentRepository = new StudentRepository();
export class PaymentService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        try {
            if (new Date(data.payment_date) > new Date())
                throw new HandlerError(400, 'A data de pagamento não pode ser maior que a data atual.');
            const studentExisting = await studentRepository.findById(+data.student_id);
            if (!data.payment_method || !data.payment_date || !mapOfPaymentReasons[data.payment_reason] || !studentExisting) {
                throw new HandlerError(404, 'Ocorreu um erro com os dados enviados, por favor os verifique.');
            }
            const dataPayment = {
                ...data,
                student_id: +data.student_id,
                payment_date: new Date(data.payment_date),
                payment_reason: mapOfPaymentReasons[data.payment_reason].payment_reason,
                value: mapOfPaymentReasons[data.payment_reason].value,
            };
            await this.repository.create(dataPayment);
        }
        catch (error) {
            if (error.code === 'P2025')
                error.message = 'Aluno não encontrado.';
            console.error(error.message);
            throw error;
        }
    }
    async getPayments() {
        const payments = await this.repository.getPayments();
        return payments;
    }
    async getPaymentsByPeriod(period) {
        const intervalTimeStamp = period * 24 * 60 * 60 * 1000;
        const currentTimeStamp = new Date().getTime();
        const initialDate = new Date(currentTimeStamp - intervalTimeStamp);
        initialDate.setHours(0, 0, 0, 0);
        return await this.repository.getPaymentsByPeriod(new Date(initialDate));
    }
    async getCurrentMonthPayments() {
        const initialDate = new Date();
        const finalDate = new Date();
        initialDate.setDate(1);
        finalDate.setMonth(initialDate.getMonth() + 1);
        finalDate.setDate(1);
        finalDate.setHours(0, 0, 0, 0);
        initialDate.setHours(0, 0, 0, 0);
        return await this.repository.getCurrentMonthPayments(initialDate, finalDate);
    }
}
