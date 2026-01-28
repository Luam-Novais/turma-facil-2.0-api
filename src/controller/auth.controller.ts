import type { NextFunction, Request, Response } from 'express';
import { HandlerError } from '../middlewares/handlerError';
import { CreateAccountDTO, Credentials } from '../types/auth';
import { AuthService } from '../service/auth.services';
import { AuthRepository } from '../repository/auth.repository';

const repository = new AuthRepository();
const service = new AuthService(repository);
export class AuthController {
  async login(req: Request<{}, {}, Credentials>, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) throw new HandlerError(400, 'Identificadores não enviados.');
      const {token} = await service.login({identifier, password})
      res.status(200).json({message:"Login feito com sucesso", token})
    } catch (error: any) {
      next(error);
    }
  }
  async createAccount(req: Request<{}, {}, CreateAccountDTO>, res: Response, next: NextFunction) {
    try {
      const { name, password, username } = req.body;
      if (!name || name.length === 0 || !password || password.length === 0 || !username || username.length === 0) {
        throw new HandlerError(400, 'Dados necessários não enviados.');
      }
      const result = await service.createAccount({ name, username, password });
      if(result instanceof Error) throw new HandlerError(400, result.message)
      res.status(201).json({ message: 'Professor criado com sucesso.', accessToke: result?.token });
    } catch (error: any) {
      next(error);
    }
  }
}
