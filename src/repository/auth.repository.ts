import { prisma } from '../config/prisma';
import { CreateAccountDTO } from '../types/auth';

export class AuthRepository {
  async find() {
    return await prisma.teacher.findFirst();
  }
  async findByUsername(identifier: string) {
    return await prisma.teacher.findUnique({ where: { username: identifier } });
  }
  async createAccount(data: CreateAccountDTO) {
    return await prisma.teacher.create({ data: { ...data } });
  }
}
