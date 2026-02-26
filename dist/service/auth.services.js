import { HandlerError } from '../middlewares/handlerError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async login({ identifier, password }) {
        const teacherExisting = await this.repository.findByIdentifier(identifier);
        if (!teacherExisting)
            throw new HandlerError(400, 'Credenciais inválidas.');
        const passwordIsValid = await bcrypt.compare(password, teacherExisting.password);
        if (!passwordIsValid)
            throw new HandlerError(400, 'Credenciais inválidas.');
        const payload = { id: teacherExisting.id, name: teacherExisting.name };
        const token = this.generateToken(payload);
        return { token };
    }
    async createAccount({ name, password, identifier }) {
        const teacherExists = await this.repository.find();
        if (teacherExists)
            throw new HandlerError(400, "Esse sistema serve para apenas um usuário, e já está em uso.");
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const data = {
                name: name.toLocaleLowerCase().trim(),
                password: hashPassword,
                identifier: identifier,
            };
            const created = await this.repository.createAccount(data);
            const payload = {
                id: created.id,
                name: created.name,
            };
            const token = this.generateToken(payload);
            return { token };
        }
        catch (error) {
            console.error(error.message);
            error.message = 'Falha ao criar conta, nome de usuário já está em uso.';
            return error;
        }
    }
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    }
}
