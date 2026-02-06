import { Decimal } from "@prisma/client/runtime/client"
import { mapOfPaymentReasons } from "../utils/mapOfPaymentReason"

export interface Payment{
    id?: number
    payment_method: string
    value : number | Decimal
    payment_reason: string
    student_id: number
    payment_date: Date
}
type PaymentReason = keyof typeof mapOfPaymentReasons
export interface CreatePaymentDTO {
  payment_method: string,
  student_id : number 
  payment_date: string,
  payment_reason: PaymentReason
}
export interface TableBodyPayment {
  name: string;
  data: string;
  forma: string;
  valor: string;
  reason: string;
}