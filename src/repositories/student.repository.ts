import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Student} from '../models';
import {MlabDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id
> {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Student, dataSource);
  }
}
