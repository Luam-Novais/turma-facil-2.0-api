import { PaymentService } from '../service/payment.services';
import { PaymentRepository } from '../repository/payment.repository';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { CreatePaymentDTO } from '../types/payment';
import { HandlerError } from '../middlewares/handlerError';

const repository = new PaymentRepository();
const service = new PaymentService(repository);
export class PaymentController {
  async create(req: Request<{}, {}, CreatePaymentDTO>, res: Response, next: NextFunction) {
    try {
      await service.create(req.body);
      res.status(201).json({ message: 'Registro de pagamento criado com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
  async getPayments(req: Request, res: Response, next: NextFunction) {
    const payments = await service.getPayments();
    res.status(200).json(payments);
  }
  async getPaymentsByPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const { period } = req.query;
      if (!period) throw new HandlerError(400, 'Valor de intervalo não enviado.');
      const payments = await service.getPaymentsByPeriod(Number(period));
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }
  async getCurrentMonthPayments(req: Request, res: Response, next: NextFunction) {
    const payments = await service.getCurrentMonthPayments();
    res.status(200).json(payments);
  }
}
