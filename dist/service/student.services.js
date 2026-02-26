import { HandlerError } from '../middlewares/handlerError.js';
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];
export class StudentService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        try {
            if (data.name.length === 0 || data.phone.length === 0 || data.cpf.length === 0) {
                throw new HandlerError(400, 'Não pode conter campos vazios.');
            }
            const studentData = {
                ...data,
                date_birth: new Date(data.date_birth),
            };
            const createdStudent = await this.repository.create(studentData);
            if (createdStudent instanceof Error)
                throw new HandlerError(400, createdStudent.message);
        }
        catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    async update(data, studentId) {
        try {
            const studentExisting = await this.repository.findById(studentId);
            if (!studentExisting)
                throw new HandlerError(404, 'Aluno não encontrado.');
            const subsData = { subscription_type: !subscriptionTypes.includes(data.subscription_type) ? undefined : data.subscription_type };
            const formatData = { ...data, subscription_type: undefined };
            Object.entries(data).forEach(([key, value]) => {
                const typedKey = key;
                if (value === '' || value === null || value === 'undefined') {
                    formatData[typedKey] = undefined;
                }
            });
            formatData.date_birth = data.date_birth ? new Date(data.date_birth) : undefined;
            console.log(formatData);
            await this.repository.update(formatData, subsData, studentId);
        }
        catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    async handleStatusStudent(id, status) {
        try {
            const studentExisting = await this.repository.findById(id);
            if (!studentExisting)
                throw new HandlerError(404, 'Aluno não encontrado.');
            if (status) {
                return this.repository.activeStudent(id);
            }
            else {
                return this.repository.desactiveStudent(id);
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async delete(studentId) {
        try {
            const deleted = await this.repository.delete(studentId);
            if (deleted instanceof Error)
                throw new HandlerError(400, deleted.message);
        }
        catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    async get() {
        try {
            const students = await this.repository.getStudents();
            return students;
        }
        catch (error) {
            throw error;
        }
    }
    async getBySearchName(searchName) {
        try {
            const findeds = await this.repository.getBySearch(searchName);
            if (findeds instanceof Error)
                throw new HandlerError(400, findeds.message);
            if (!findeds)
                throw new HandlerError(400, 'Nenhum registro foi encontrado.');
            return findeds;
        }
        catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}
