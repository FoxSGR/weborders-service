import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Color } from '../models/Color';

@Service()
@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {}
