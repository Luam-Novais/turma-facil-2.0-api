import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { ensureAuth } from "../middlewares/ensureAuth.js";

const router = Router()
const controller = new AuthController()

router.post('/login', (req, res, next)=> controller.login(req, res, next))
router.get('/me', ensureAuth, (req, res, next) => controller.me(req, res, next));
router.post('/create-account', (req, res, next) => controller.createAccount(req, res, next));

export default router