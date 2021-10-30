import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IEntity } from '../../types/IEntity';

export class EntityBase implements IEntity {
  @Column({
    default: false,
  })
  removed: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
