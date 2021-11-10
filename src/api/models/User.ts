import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsArray, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Client } from './Client';
import { EntityBase } from './base/EntityBase';
import { IUser, Role, roles } from '../../types';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @Column({ name: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'simple-json' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate((role) => !!roles[role])
  roles: Role[];

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;

  @OneToMany(() => Client, (client) => client.id)
  clients: Promise<Client[]>;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }

  toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`;
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      void bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }
}
