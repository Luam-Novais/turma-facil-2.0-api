export interface Student {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  date_birth: Date;
  observations?: string;
  subscription_type: SubscriptionType;
}
export interface CreateStudentDTO {
  name: string;
  phone: string;
  cpf: string;
  date_birth: Date;
  observations?: string;
  subscription_type: SubscriptionType;
}
export type SubscriptionType = 'EXPERIMENTAL' | 'MENSAL_1X' | 'MENSAL_2X' ;

export interface UpdateStudentDTO {
  id?: number;
  name?: string;
  phone?: string;
  cpf?: string;
  date_birth?: Date;
  observations?: string;
  subscription_type?: SubscriptionType;
}
