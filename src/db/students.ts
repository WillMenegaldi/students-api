import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

function updateStudent(updatedStudent: Student) 
{
  const index =  students.findIndex(std => std.id === updatedStudent.id);
  if(index < -1) 
  {
    students[index] = updatedStudent;
    
    return Promise.resolve(students[index]);
  }
  
  return Promise.reject({error:"student not found"});
}

const deleteStudent = (id: number) => {
  const entity = students.find((student: Student) => student.id === id);

  if (entity) {
    const index: number = students.indexOf(entity);

    students.splice(index, 1);

    return Promise.resolve(entity);
  }

  return Promise.resolve(null);
};

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

export { addStudent, getStudents, updateStudent, deleteStudent };
