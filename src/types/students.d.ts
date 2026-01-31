import { Vinculo } from "../generated/prisma/client";
export interface CreateStudentDTO {
  name: string;
  phone: string;
  cpf: string;
  date_birth: Date;
  observations?: string;
  subscription_type: SubscriptionType
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
// export interface Vinculo {
//   id: Number;
//   aluno_id: number;
//   ativo: boolean;
//   tipo_vinculo: Tipo_vinculo;
//   data_inicio: Date;
//   data_fim?: Date;
// }
