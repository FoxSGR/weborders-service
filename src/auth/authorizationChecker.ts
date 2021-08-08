import jwt, { JwtPayload } from 'jsonwebtoken';
import { Action, UnauthorizedError } from 'routing-controllers';
import { Connection } from 'typeorm';

export function authorizationChecker(
  connection: Connection
): (action: Action, roles: any[]) => Promise<boolean> | boolean {
  return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
    const authHeader = action.request.get('Authorization');
    if (!authHeader) {
      const customError = new UnauthorizedError('Authorization header not provided');
      action.next(customError);
      return false;
    }

    return new Promise((resolve) => {
      try {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (jwtPayload: JwtPayload) => {
          ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
          action.request.jwtPayload = jwtPayload;
          resolve(true);
        });
      } catch (err) {
        const customError = new UnauthorizedError('Token generation error');
        action.next(customError);
        resolve(false);
      }
    });
  };
}
