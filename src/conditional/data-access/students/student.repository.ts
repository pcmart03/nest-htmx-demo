import { Student } from '@src/conditional/types/student.types';

const students: Student[] = [
  { id: 1, name: 'August Martin', email: 'augie@contoso.com' },
];
let nextId = 2;
const getStudents = (): Student[] => students;

const addStudent = (student: Partial<Student>) => {
  students.push({ id: nextId, ...student } as Student);
  nextId++;
};

export const studentRepository = {
  getStudents,
  addStudent,
};
