import { HandlerError } from '../middlewares/handlerError.js';
import { AuthService } from '../service/auth.services.js';
import { AuthRepository } from '../repository/auth.repository.js';
import { configAccessToken } from '../utils/configCookies.js';
const repository = new AuthRepository();
const service = new AuthService(repository);
export class AuthController {
    async login(req, res, next) {
        try {
            const { identifier, password } = req.body;
            if (!identifier || !password)
                throw new HandlerError(400, 'Identificadores não enviados.');
            const { token } = await service.login({ identifier, password });
            res.cookie('accessToken', token, configAccessToken);
            res.status(200).json({ message: 'Login feito com sucesso' });
        }
        catch (error) {
            next(error);
        }
    }
    async createAccount(req, res, next) {
        try {
            const existUser = await repository.find();
            if (existUser)
                throw new HandlerError(400, 'Esse sistema só pode ser usado por um usuário.');
            const { name, password, identifier } = req.body;
            if (!name || name.length === 0 || !password || password.length === 0 || !identifier || identifier.length === 0) {
                throw new HandlerError(400, 'Dados necessários não enviados.');
            }
            const result = await service.createAccount({ name, identifier, password });
            if (result instanceof Error)
                throw new HandlerError(400, result.message);
            res.cookie('accessToken', result.token, configAccessToken);
            res.status(201).json({ message: 'Professor criado com sucesso.', accessToke: result.token });
        }
        catch (error) {
            next(error);
        }
    }
}
