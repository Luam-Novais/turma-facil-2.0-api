import { Request, Response, NextFunction } from 'express-serve-static-core';
import { CreateStudentDTO, UpdateStudentDTO } from '../types/students';
import { StudentService } from '../service/student.services';
import { StudentRepository } from '../repository/student.repository';
import { HandlerError } from '../middlewares/handlerError';

const repository = new StudentRepository();
const service = new StudentService(repository);

export class StudentController {
  async create(req: Request<{}, {}, CreateStudentDTO>, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await service.create(data);
      res.status(200).json({ message: 'Aluno criado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request<{}, {}, UpdateStudentDTO>, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) throw new HandlerError(400, 'query params de id não foi enviado.');
      const data = req.body;
      await service.update(data, +id);
      res.status(200).json({ message: 'Aluno editado com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
  async handleStatusStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const {status} = req.body
      if (!id) throw new HandlerError(400, 'query params de id não foi enviado.');
        await service.handleStatusStudent(+id, status as boolean);
      res.status(200).json({ message: `Cadastro de aluno ${status ? 'ativado' : 'desativado'}.` });
    } catch (error) {
      next(error);
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await service.get();
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }
  async getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchName } = req.query;
      if (!searchName || searchName == undefined) throw new HandlerError(400, 'query params para pesquisa não foi enviado.');
      const findeds = await service.getBySearchName(searchName.toString());
      res.status(200).json(findeds);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) throw new HandlerError(400, 'query params de id não foi enviado.');
      await service.delete(Number(id));
      res.status(200).json({ message: 'Aluno excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}
