import { HandlerError } from '../middlewares/handlerError';
import { StudentRepository } from '../repository/student.repository';
import { CreateStudentDTO, UpdateStudentDTO } from '../types/students';

export class StudentService {
  constructor(private repository: StudentRepository) {}
  async create(data: CreateStudentDTO) {
    try {
      if (data.nome.length === 0 || data.telefone.length === 0 || data.cpf.length === 0) {
        throw new HandlerError(400, 'Não pode conter campos vazios.');
      }
      const studentData = {
        ...data,
        data_nascimento: new Date(data.data_nascimento),
      };
      const createdStudent = await this.repository.create(studentData);
      if (createdStudent instanceof Error) throw new HandlerError(400, createdStudent.message);
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
  async update(data: UpdateStudentDTO, studentId: number) {
    try {
      const studentExisting = await this.repository.findById(studentId);
      const updated = await this.repository.update(data, studentId);
      if (updated instanceof Error) throw new HandlerError(400, updated.message);
    } catch (error: any) {
      console.error(error.message);
      if ((error.code = 'P2025')) {
        error.message = 'Aluno não encontrado.';
        throw new HandlerError(404, error.message);
      }
      throw error;
    }
  }
  async delete(studentId: number) {
    try {
      const deleted = await this.repository.delete(studentId);
      if(deleted instanceof Error) throw new HandlerError(400, deleted.message)
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
  async get() {
    try {
      const students = await this.repository.getStudents();
      return students;
    } catch (error) {
      throw error;
    }
  }
  async getBySearchName(searchName: string){
    try {
        const findeds = await this.repository.getBySearch(searchName);
        if(findeds instanceof Error) throw new HandlerError(400, findeds.message)
        if(!findeds) throw new HandlerError(400, "Nenhum registro foi encontrado.");
        return findeds
    } catch (error:any) {
        console.error(error.message)
        throw error
    }
  }
}
