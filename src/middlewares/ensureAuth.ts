import { NextFunction, Request, Response } from 'express';
import { HandlerError } from './handlerError';
import jwt from 'jsonwebtoken';

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new HandlerError(401, 'Usuário não autorizado.');
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string);
    if (decode) {
      next();
    } else throw new HandlerError(401, 'Usuário não autorizado.');
  } catch (error: any) {
    throw new HandlerError(401, error.message)
  }
}
