import { prisma } from '../config/prisma.js';
import { CreateAccountDTO } from '../types/auth.js';

export class AuthRepository {
  async find() {
    return await prisma.teacher.findFirst();
  }
  async findByIdentifier(identifier: string) {
    return await prisma.teacher.findUnique({ where: { identifier: identifier } });
  }
  async createAccount(data: CreateAccountDTO) {
    return await prisma.teacher.create({ data: { ...data } });
  }
}
