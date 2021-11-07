import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { OwnedEntity } from './base/OwnedEntity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  red: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  green: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  blue: number;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
