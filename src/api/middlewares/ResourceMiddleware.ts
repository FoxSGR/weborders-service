import { ForbiddenError, Middleware, NotFoundError } from 'routing-controllers';
import * as express from 'express';
import { Container } from 'typedi';

import { AuthService } from '../services';

@Middleware({ type: 'before' })
export class ResourceMiddleware {
  public async use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const authService = Container.get(AuthService);

    if (!req.path.includes('/resources/')) {
      next();
      return;
    }

    if (!(await authService.verify(req, next))) {
      return;
    }

    const match = req.path.match(/\/resources\/([^\/]+)\//);
    if (!match) {
      next(new NotFoundError());
      return;
    }

    const folder = match[1];
    if (folder !== String(req['user'].id)) {
      next(new ForbiddenError());
      return;
    }

    next();
  }
}
