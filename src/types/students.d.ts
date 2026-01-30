import { Vinculo } from "../generated/prisma/client";
export interface CreateStudentDTO {
  nome: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  observacoes?: string;
  tipo_vinculo: Tipo_vinculo
}
type Tipo_vinculo = 'EXPERIMENTAL' | 'MENSAL';

export interface UpdateStudentDTO {
  id: number;
  nome?: string;
  telefone?: string;
  cpf?: string;
  data_nascimento?: Date;
  observacoes?: string;
  tipo_vinculo?: Tipo_vinculo;
}
// export interface Vinculo {
//   id: Number;
//   aluno_id: number;
//   ativo: boolean;
//   tipo_vinculo: Tipo_vinculo;
//   data_inicio: Date;
//   data_fim?: Date;
// }
