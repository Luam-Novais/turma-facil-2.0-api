import Router from 'express';
import { ReportController } from '../controller/report.controller';
import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();
const controller = new ReportController();

router.post('/payment', ensureAuth, (req, res, next) => controller.genereatePaymentReport(req, res, next));
router.post('/student', ensureAuth, (req, res, next) => controller.genereatePaymentReport(req, res, next));
export default router;
