import { prisma } from '../config/prisma.js';
export class AuthRepository {
    async find() {
        return await prisma.teacher.findFirst();
    }
    async findByIdentifier(identifier) {
        return await prisma.teacher.findUnique({ where: { identifier: identifier } });
    }
    async createAccount(data) {
        return await prisma.teacher.create({ data: { ...data } });
    }
}
