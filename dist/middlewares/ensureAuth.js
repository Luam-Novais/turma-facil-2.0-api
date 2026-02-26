import { HandlerError } from './handlerError.js';
import jwt from 'jsonwebtoken';
export function ensureAuth(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken)
            throw new HandlerError(401, 'Usuário não autorizado.');
        const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        if (decode) {
            next();
        }
        else
            throw new HandlerError(401, 'Usuário não autorizado.');
    }
    catch (error) {
        throw new HandlerError(401, error.message);
    }
}
