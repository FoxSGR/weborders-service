import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { InternalServerError, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
import { User } from '../models';
import { UserService } from './UserService';

@Service()
export class AuthService {
  constructor(
    private userService: UserService,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  async login(
    username: string,
    password: string
  ): Promise<{ user: User; token: string } | undefined> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return undefined;
    }

    if (await AuthService.comparePassword(password, user.password)) {
      return new Promise((resolve, reject) => {
        jwt.sign(
          { user: user.id },
          env.auth.secret,
          {
            expiresIn: '30d',
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

  async verify(request: Request, next: (data: any) => void): Promise<boolean> {
    const token =
      request.get('Authorization')?.split(' ')[1] ||
      (request.query.token as string);
    if (!token) {
      next(new UnauthorizedError('Authorization header not provided'));
      return false;
    }

    return new Promise((resolve) => {
      try {
        const payload: JwtPayload = jwt.verify(token, env.auth.secret) as any;

        this.userService
          .findOne(payload.user, undefined, true)
          .then((user) => {
            request['user'] = user;
            resolve(true);
          })
          .catch((error) => {
            this.log.error(error);
            next(new InternalServerError('Could not find the user'));
            resolve(false);
          });
      } catch (e: any) {
        this.log.error(e);
        next(new UnauthorizedError('Token validation error'));
        resolve(false);
      }
    });
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
