import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Component } from '../models/Component';

@Service()
@EntityRepository(Component)
export class ComponentRepository extends Repository<Component> {}
