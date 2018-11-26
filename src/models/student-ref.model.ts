import { Model, model, property } from '@loopback/repository';

@model()
export class StudentRef extends Model {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  studentId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<StudentRef>) {
    super(data);
  }
}
