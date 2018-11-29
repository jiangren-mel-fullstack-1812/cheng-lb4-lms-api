import { Entity, model, property } from '@loopback/repository';

@model()
export class Enrollment extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  studentId: number;

  @property({
    type: 'string',
    required: true
  })
  courseId: number;

  @property({
    type: 'string',
  })
  studentName?: string;

  @property({
    type: 'string',
  })
  courseName?: string;

  @property({
    type: 'date',
  })
  enrolTime?: string;

  constructor(data?: Partial<Enrollment>) {
    super(data);
  }
}
