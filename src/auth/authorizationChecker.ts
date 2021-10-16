import jwt, { JwtPayload } from 'jsonwebtoken';
import { Action, InternalServerError, UnauthorizedError } from 'routing-controllers';
import { User } from '../api/models/User';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { UserService } from '../api/services/UserService';
import { Logger } from '../lib/logger';
import { env } from '../env';

export function authorizationChecker(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connection: Connection
): (action: Action, roles: any[]) => Promise<boolean> | boolean {
  const logger = new Logger(__dirname);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
    const authHeader: string = action.request.get('Authorization');
    if (!authHeader) {
      const customError = new UnauthorizedError('Authorization header not provided');
      action.next(customError);
      return false;
    }

    return new Promise((resolve) => {
      try {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, env.auth.secret, (jwtPayload: JwtPayload) => {
          findUser(jwtPayload.user)
            .then((user) => {
              action.request.user = user;
              resolve(true);
            })
            .catch((error) => {
              logger.error(error);
              resolve(false);
              action.next(new InternalServerError('Could not find the user'));
            });
        });
      } catch (error) {
        logger.error(error);
        const customError = new UnauthorizedError('Token generation error');
        action.next(customError);
        resolve(false);
      }
    });
  };
}

async function findUser(username: string): Promise<User | undefined> {
  const userService = Container.get(UserService);
  return await userService.findOne(username);
}
