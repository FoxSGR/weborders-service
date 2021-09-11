import jwt, { JwtPayload } from 'jsonwebtoken';
import { Action, UnauthorizedError } from 'routing-controllers';
import { User } from '../api/models/User';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { UserService } from '../api/services/UserService';

export function authorizationChecker(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connection: Connection
): (action: Action, roles: any[]) => Promise<boolean> | boolean {
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
        jwt.verify(token, process.env.JWT_SECRET, (jwtPayload: JwtPayload) => {
          findUser(jwtPayload.user)
            .then((user) => {
              action.request.user = user;
              resolve(true);
            })
            .catch(() => resolve(false));
        });
      } catch (err) {
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
