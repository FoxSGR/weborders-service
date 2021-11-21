import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  Action,
  InternalServerError,
  UnauthorizedError,
} from 'routing-controllers';
import Container from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../api/models/User';
import { UserService } from '../api/services/UserService';
import { env } from '../env';
import { Logger } from '../lib/logger';

export function authorizationChecker(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connection: Connection
): (action: Action, roles: any[]) => Promise<boolean> | boolean {
  const logger = new Logger(__dirname);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async function innerAuthorizationChecker(
    action: Action,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roles: string[]
  ): Promise<boolean> {
    const authHeader: string = action.request.get('Authorization');
    if (!authHeader) {
      const customError = new UnauthorizedError(
        'Authorization header not provided'
      );
      action.next(customError);
      return false;
    }

    return new Promise((resolve) => {
      try {
        const token = authHeader.split(' ')[1];
        const payload: JwtPayload = jwt.verify(token, env.auth.secret) as any;

        findUser(payload.user)
          .then((user) => {
            action.request.user = user;
            resolve(true);
          })
          .catch((error) => {
            logger.error(error);
            resolve(false);
            action.next(new InternalServerError('Could not find the user'));
          });
      } catch (error: any) {
        console.log(error);
        const customError = new UnauthorizedError('Token validation error');
        action.next(customError);
        resolve(false);
      }
    });
  };
}

function findUser(username: string): Promise<User | undefined> {
  const userService = Container.get(UserService);
  return userService.findByUsername(username);
}
