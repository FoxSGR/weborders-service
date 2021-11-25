import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { ShoeSample } from '../models';

@Service()
@EntityRepository(ShoeSample)
export class ShoeSampleRepository extends Repository<ShoeSample> {}
