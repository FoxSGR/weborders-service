import { Action } from 'routing-controllers';
import { AuthService } from '../api/services';
import Container from 'typedi';

export function authorizationChecker(): (
  action: Action,
  roles: any[]
) => Promise<boolean> | boolean {
  const authService = Container.get(AuthService);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async function innerAuthorizationChecker(
    action: Action
  ): Promise<boolean> {
    return authService.verify(action.request, action.next as any);
  };
}
