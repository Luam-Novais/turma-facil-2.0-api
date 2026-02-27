import { NextFunction, Request, Response } from 'express';
import { HandlerError } from './handlerError.js';
import jwt from 'jsonwebtoken';

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers.authorization
    if(!tokenHeader) throw new HandlerError(401, 'Token não enviado.');

    const token = tokenHeader.split(' ')[1]
    if (!token) throw new HandlerError(401, 'Token não enviado.');
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (decode) {
      next();
    } else throw new HandlerError(401, 'Usuário não autorizado.');
  } catch (error: any) {
    throw new HandlerError(401, error.message)
  }
}
