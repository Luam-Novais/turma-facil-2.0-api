import Router from 'express'
import { PaymentController } from '../controller/payment.controller'

const controller = new PaymentController()
const router = Router()
router.post('/create', (req, res, next) => controller.create(req, res, next));
router.get('/get-payments', (req, res, next) => controller.getPayments(req, res, next))
router.get('/get-payments-by-period', (req, res, next) => controller.getPaymentsByPeriod(req, res, next));
router.get('/get-current-month-payments', (req, res, next) => controller.getCurrentMonthPayments(req, res, next));
export default router 