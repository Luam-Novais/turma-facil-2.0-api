import { prisma } from '../config/prisma.js';

import { CreateStudentDTO, SubscriptionType, UpdateStudentDTO } from '../types/students.js';

export class StudentRepository {
  async findById(id: number) {
    return await prisma.student.findUniqueOrThrow({ where: { id: id } });
  }
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
  async update(data: UpdateStudentDTO, subsData: { subscription_type: SubscriptionType | undefined }, studentId: number) {
    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        ...data,
      },
    });
    await prisma.subscription.update({
      where: { student_id: studentId },
      data: { ...subsData },
    });
  }
  async desactiveStudent(id: number) {
    return prisma.subscription.update({
      where: {
        student_id: id,
      },
      data: {
        isActive: false,
        end_date: new Date(),
      },
    });
  }
  async activeStudent(id: number) {
    return prisma.subscription.update({
      where: {
        student_id: id,
      },
      data: {
        isActive: true,
        end_date: null,
      },
    });
  }
  async getStudents() {
    return await prisma.student.findMany({
      include: {
        subscription: {
          select: {
            id: true,
            isActive: true,
            subscription_type: true,
            start_date: true,
          },
        },
      },
    });
  }
  async delete(studentId: number) {
    return await prisma.student.delete({ where: { id: studentId } });
  }
  async getBySearch(searchName: string) {
    return await prisma.student.findMany({
      where: { name: { contains: searchName, mode: 'insensitive' } },
      include: {
        subscription: {
          select: {
            id: true,
            isActive: true,
            subscription_type: true,
            start_date: true,
          },
        },
      },
    });
  }
}
