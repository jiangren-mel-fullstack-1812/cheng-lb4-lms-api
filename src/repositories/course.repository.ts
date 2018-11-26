import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Course} from '../models';
import {MlabDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id
> {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Course, dataSource);
  }
}
