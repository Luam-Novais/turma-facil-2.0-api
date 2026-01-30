import { prisma } from '../config/prisma';
import { CreateStudentDTO, UpdateStudentDTO } from '../types/students';

export class StudentRepository {
  async findById(id:number) {return await prisma.aluno.findUniqueOrThrow({where: {id: id}})}
  async create(data: CreateStudentDTO) {
    const studentCreated = await prisma.aluno.create({
      data: {
        nome: data.nome,
        cpf: data.cpf,
        data_nascimento: data.data_nascimento,
        telefone: data.telefone,
      },
    });
    const vinculoCreated = await prisma.vinculo.create({
      data: {
        aluno_id: studentCreated.id,
        tipo_vinculo: data.tipo_vinculo,
        ativo: true,
      },
    });
    return { vinculoCreated, studentCreated };
  }
  async update(data: UpdateStudentDTO, studentId: number) {
    return await prisma.aluno.update({
      where: {
        id: studentId,
      },data: {
        ...data
      }
    });
  }
  async getStudents() {
    return await prisma.aluno.findMany({ include: { vinculo: { where: { ativo: true } } } });
  }
  async delete(studentId: number){
    return await prisma.aluno.delete({where:{id:studentId}})
  }
  async getBySearch(searchName: string){
    return await prisma.aluno.findMany({ where: { nome: { contains: searchName, mode: 'insensitive' } } });
  }
}
