import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

import { ShoeOrder } from '../models/ShoeOrder';

@Service()
@EntityRepository(ShoeOrder)
export class ShoeOrderRepository extends Repository<ShoeOrder> {}
