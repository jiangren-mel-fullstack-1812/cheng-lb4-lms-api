import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Enrollment} from '../models';
import {MlabDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EnrollmentRepository extends DefaultCrudRepository<
  Enrollment,
  typeof Enrollment.prototype.id
> {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Enrollment, dataSource);
  }
}
