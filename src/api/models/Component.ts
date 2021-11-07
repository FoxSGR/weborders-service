import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OwnedEntity } from './base/OwnedEntity';
import { IsNotEmpty, Min } from 'class-validator';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  type: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @Min(0)
  @Column({ default: null })
  amount?: number;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
