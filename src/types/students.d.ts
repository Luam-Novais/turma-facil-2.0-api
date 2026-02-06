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
type SubscriptionType = 'EXPERIMENTAL' | 'MENSAL';

export interface UpdateStudentDTO {
  id: number;
  name?: string;
  phone?: string;
  cpf?: string;
  date_birth?: Date;
  observations?: string;
  subscription_type?: SubscriptionType;
}
