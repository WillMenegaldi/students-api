import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Student } from "src/types/Student";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) 
  {
    const id:number = Number(req.params.id);
    const student:Student = req.body
    student.id = id
    
    try
    {
      const updatedStudent = await StudentsDB.updateStudent(student);
      
      return res.status(StatusCodes.ACCEPTED).json(updatedStudent);
    }
    catch(err)
    {
      return res.status(StatusCodes.NOT_FOUND).json(err)
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (id) {
      const student: Student = await StudentsDB.deleteStudent(id);

      if (!student) {
        return res.status(StatusCodes.NOT_FOUND).send();
      }
  
      return res
        .status(StatusCodes.OK)
        .json({ message: "Student deletado com sucesso"}); 
    }
    else
    {
      return res.status(StatusCodes.BAD_REQUEST).send();
    }
  }
}
