import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    if (req.path.includes('/resources/')) {
      console.log(req['user'])
    }

    next();
  }
}
