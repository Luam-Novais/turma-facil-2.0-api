import type { NextFunction, Request, Response } from 'express';
import { HandlerError } from '../middlewares/handlerError.js';
import { CreateAccountDTO, Credentials } from '../types/auth.js';
import { AuthService } from '../service/auth.services.js';
import { AuthRepository } from '../repository/auth.repository.js';
import jwt from 'jsonwebtoken'

const repository = new AuthRepository();
const service = new AuthService(repository);
export class AuthController {
  async login(req: Request<{}, {}, Credentials>, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) throw new HandlerError(400, 'Identificadores não enviados.');
      const { token } = await service.login({ identifier, password });
      res.status(200).json({ message: 'Login feito com sucesso', token });
    } catch (error: any) {
      next(error);
    }
  }
  async me(req: Request<{}, {}, Credentials>, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({message: 'Token válido.'}) 
    } catch (error: any) {
      next(error);
    }
  }
  async createAccount(req: Request<{}, {}, CreateAccountDTO>, res: Response, next: NextFunction) {
    try {
      const existUser = await repository.find();
      if (existUser) throw new HandlerError(400, 'Esse sistema só pode ser usado por um usuário.');
      const { name, password, identifier } = req.body;
      if (!name || name.length === 0 || !password || password.length === 0 || !identifier || identifier.length === 0) {
        throw new HandlerError(400, 'Dados necessários não enviados.');
      }
      const result = await service.createAccount({ name, identifier, password });
      if (result instanceof Error) throw new HandlerError(400, result.message);
      res.status(201).json({ message: 'Professor criado com sucesso.', token: result.token });
    } catch (error: any) {
      next(error);
    }
  }
}
