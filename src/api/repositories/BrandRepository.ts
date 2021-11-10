import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Brand } from '../models/Brand';

@Service()
@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {}
