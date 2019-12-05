import { Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { logger } from '../logger';

export class ValidationMiddleware implements ExpressMiddlewareInterface {
  public use(request: Request, response: Response, next?: (err?: Error) => void): void | boolean {
    logger.info('validation middleware');
    next();
  }
}
