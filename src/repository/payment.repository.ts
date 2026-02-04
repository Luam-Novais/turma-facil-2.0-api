import { Payment } from '../types/payment';
import { prisma } from '../config/prisma';
export class PaymentRepository {
  async create(data: Payment) {
    return await prisma.payment.create({
      data: {
        ...data,
      },
    });
  }
  async getPayments(){
    return await prisma.payment.findMany({include:{student:{}}})
  }
  async getPaymentsByPeriod(initialDate:Date){
    return await prisma.payment.findMany({
      where:{
        payment_date:{
          gte: initialDate,
          lt: new Date()
        }
      }
    })

  }
  async getCurrentMonthPayments(initialDate:Date, finalDate:Date){
    return await prisma.payment.findMany({
      where:{
        payment_date:{
          gte: initialDate,
          lt: finalDate
        }
      }
    })
  }
}
