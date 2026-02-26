import { PaymentService } from '../service/payment.services.js';
import { PaymentRepository } from '../repository/payment.repository.js';
import { HandlerError } from '../middlewares/handlerError.js';
const repository = new PaymentRepository();
const service = new PaymentService(repository);
export class PaymentController {
    async create(req, res, next) {
        try {
            await service.create(req.body);
            res.status(201).json({ message: 'Registro de pagamento criado com sucesso.' });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
    async getPayments(req, res, next) {
        const payments = await service.getPayments();
        res.status(200).json(payments);
    }
    async getPaymentsByPeriod(req, res, next) {
        try {
            const { period } = req.query;
            if (!period)
                throw new HandlerError(400, 'Valor de intervalo não enviado.');
            const payments = await service.getPaymentsByPeriod(Number(period));
            res.status(200).json(payments);
        }
        catch (error) {
            next(error);
        }
    }
    async getCurrentMonthPayments(req, res, next) {
        const payments = await service.getCurrentMonthPayments();
        res.status(200).json(payments);
    }
}
