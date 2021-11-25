import { Column } from 'typeorm';
import { IsNotEmpty, Validate } from 'class-validator';

import { ISeason, SeasonType, seasonTypes } from '../../types';

export class Season implements ISeason {
  @Column()
  year: number;

  @IsNotEmpty()
  @Validate((type) => seasonTypes.includes(type))
  @Column({ type: 'enum', enum: seasonTypes })
  seasons: SeasonType;
}
