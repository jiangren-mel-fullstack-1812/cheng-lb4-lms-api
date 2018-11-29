import { Entity, model, property } from '@loopback/repository';

@model()
export class Student extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    default: 'student-name',
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}
