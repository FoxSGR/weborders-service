import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ColorRepository } from '../repositories/ColorRepository';
import { EntityService } from './EntityService';
import { Color } from '../models/Color';

@Service()
export class ColorService extends EntityService<Color> {
  constructor(
    @InjectRepository() repository: ColorRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher);
  }
}
