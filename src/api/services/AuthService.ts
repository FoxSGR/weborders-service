import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { env } from '../../env';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class AuthService {
  constructor(@InjectRepository() private userRepository: UserRepository) {}

  async login(
    username: string,
    password: string
  ): Promise<{ user: User; token: string } | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return undefined;
    }

    if (await AuthService.comparePassword(password, user.password)) {
      return new Promise((resolve, reject) => {
        jwt.sign(
          { user: user.username },
          env.auth.secret,
          {
            expiresIn: '2d',
          },
          (err, token) => {
            if (err) {
              return reject(err);
            }
            resolve({ user, token });
          }
        );
      });
    } else {
      return undefined;
    }
  }

  static comparePassword(attempt: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      void bcrypt.compare(attempt, password, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res === true);
      });
    });
  }
}
