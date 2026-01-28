import { prisma } from '../config/prisma';
import { CreateAccountDTO } from '../types/auth';

export class AuthRepository {
  async findByUsername(identifier: string){
    return await prisma.professor.findUnique({where: {username: identifier}})
  }
  async createAccount(data: CreateAccountDTO) {
    return await prisma.professor.create({ data: { ...data } });
  }
}
