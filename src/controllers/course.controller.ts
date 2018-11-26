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
} from '@loopback/rest';
import {Course} from '../models';
import {CourseRepository} from '../repositories';

export class CourseController {
  constructor(
    @repository(CourseRepository)
    public courseRepository : CourseRepository,
  ) {}

  @post('/courses', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: {'x-ts-type': Course}}},
      },
    },
  })
  async create(@requestBody() course: Course): Promise<Course> {
    return await this.courseRepository.create(course);
  }

  @get('/courses/count', {
    responses: {
      '200': {
        description: 'Course model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where,
  ): Promise<Count> {
    return await this.courseRepository.count(where);
  }

  @get('/courses', {
    responses: {
      '200': {
        description: 'Array of Course model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Course}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Course)) filter?: Filter,
  ): Promise<Course[]> {
    return await this.courseRepository.find(filter);
  }

  @patch('/courses', {
    responses: {
      '200': {
        description: 'Course PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() course: Course,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where,
  ): Promise<Count> {
    return await this.courseRepository.updateAll(course, where);
  }

  @get('/courses/{id}', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: {'x-ts-type': Course}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Course> {
    return await this.courseRepository.findById(id);
  }

  @patch('/courses/{id}', {
    responses: {
      '204': {
        description: 'Course PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() course: Course,
  ): Promise<void> {
    await this.courseRepository.updateById(id, course);
  }

  @del('/courses/{id}', {
    responses: {
      '204': {
        description: 'Course DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.courseRepository.deleteById(id);
  }
}
