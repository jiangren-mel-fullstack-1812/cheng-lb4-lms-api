import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { Enrollment, StudentRef } from '../models';
import { EnrollmentRepository, StudentRepository, CourseRepository } from '../repositories';

export class EnrollmentController {
  constructor(
    @repository(EnrollmentRepository)
    private enrollmentRepository: EnrollmentRepository,
    @repository(StudentRepository)
    private studentRepository: StudentRepository,
    @repository(CourseRepository)
    private courseRepository: CourseRepository
  ) { }

  @post('/enrollments', {
    responses: {
      '200': {
        description: 'Enrollment model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Enrollment } } },
      },
    },
  })
  async create(@requestBody() enrollment: Enrollment): Promise<Enrollment> {
    let student = await this.studentRepository.findById(enrollment.studentId);
    let course = await this.courseRepository.findById(enrollment.courseId);

    let createdEnrollment = await this.enrollmentRepository.create(enrollment);
    console.log(`------------ enrollment ${createdEnrollment.id} created`);
    if (!course.students) {
      course.students = [];
    }
    console.log(`--------- course's students ${course.students} initiated.`)
    let existingStudents = course.students.filter((studentRef: StudentRef) => {
      return studentRef.studentId == student.id;
    });
    console.log(`---------- found students ${existingStudents.length}`);
    if (existingStudents.length > 0) {
      throw new HttpErrors.BadRequest(`The student with id: ${student.id} is already in the course`);
    } else {
      console.log(`--------- push a new student ${student.id}`)
      let newStudentRef = new StudentRef();
      newStudentRef.studentId = student.id;
      newStudentRef.name = student.name;
      course.students.push(newStudentRef);
      this.courseRepository.save(course);
      console.log(`Student ${student.id} was added to the Course ${course.id}.`);
    }

    return createdEnrollment;
  }

  @get('/enrollments/count', {
    responses: {
      '200': {
        description: 'Enrollment model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Enrollment)) where?: Where,
  ): Promise<Count> {
    return await this.enrollmentRepository.count(where);
  }

  @get('/enrollments', {
    responses: {
      '200': {
        description: 'Array of Enrollment model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Enrollment } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Enrollment)) filter?: Filter,
  ): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find(filter);
  }

  @patch('/enrollments', {
    responses: {
      '200': {
        description: 'Enrollment PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() enrollment: Enrollment,
    @param.query.object('where', getWhereSchemaFor(Enrollment)) where?: Where,
  ): Promise<Count> {
    return await this.enrollmentRepository.updateAll(enrollment, where);
  }

  @get('/enrollments/{id}', {
    responses: {
      '200': {
        description: 'Enrollment model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Enrollment } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Enrollment> {
    return await this.enrollmentRepository.findById(id);
  }

  @patch('/enrollments/{id}', {
    responses: {
      '204': {
        description: 'Enrollment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() enrollment: Enrollment,
  ): Promise<void> {
    await this.enrollmentRepository.updateById(id, enrollment);
  }

  @del('/enrollments/{id}', {
    responses: {
      '204': {
        description: 'Enrollment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enrollmentRepository.deleteById(id);
  }
}
