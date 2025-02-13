import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { ShoeModel } from '../models';

@Service()
@EntityRepository(ShoeModel)
export class ShoeModelRepository extends Repository<ShoeModel> {}
