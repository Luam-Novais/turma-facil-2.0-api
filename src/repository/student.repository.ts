import { prisma } from '../config/prisma';
import { CreateStudentDTO, UpdateStudentDTO } from '../types/students';

export class StudentRepository {
  async findById(id:number) {return await prisma.student.findUniqueOrThrow({where: {id: id}})}
  async create(data: CreateStudentDTO) {
    const studentCreated = await prisma.student.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        date_birth: data.date_birth,
        phone: data.phone,
      },
    });
    const subscriptionCreated = await prisma.subscription.create({
      data: {
        student_id: studentCreated.id,
        subscription_type: data.subscription_type,
        isActive: true,
      },
    });
    return { subscriptionCreated, studentCreated };
  }
  async update(data: UpdateStudentDTO, studentId: number) {
    return await prisma.student.update({
      where: {
        id: studentId,
      },data: {
        ...data
      }
    });
  }
  async getStudents() {
    return await prisma.student.findMany({include:{subscription:{where: {isActive: true}}}})
  }
  async delete(studentId: number){
    return await prisma.student.delete({where:{id:studentId}})
  }
  async getBySearch(searchName: string){
    return await prisma.student.findMany({ where: { name: { contains: searchName, mode: 'insensitive' } } });
  }
}
