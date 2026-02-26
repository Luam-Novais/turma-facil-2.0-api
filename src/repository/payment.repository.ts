import { Payment } from '../types/payment.js';
import { prisma } from '../config/prisma.js';
export class   PaymentRepository {
  async create(data: Payment) {
    return await prisma.payment.create({
      data: {
        ...data,
      },
    });
  }
  async getPayments(){
    return await prisma.payment.findMany({
      include:{
        student:{
          select:{
            name: true,
            id: true,
            phone:true
          }
        }
      }
    })
  }
  async getPaymentsByPeriod(initialDate:Date){
    return await prisma.payment.findMany({
      where:{
        payment_date:{
          gte: initialDate,
          lt: new Date()
        }
      },
      include:{
        student:{
          select:{
            name: true,
            id: true,
            phone:true
          }
        }
      }
    })

  }
  async getCurrentMonthPayments(initialDate:Date, finalDate:Date){
    return await prisma.payment.findMany({
      where: {
        payment_date: {
          gte: initialDate,
          lt: finalDate,
        },
      },
      include: {
        student: {
          select: {
            name: true,
            id: true,
            phone: true,
          },
        },
      },
    });
  }
}
