import { Container } from 'typedi';

import { Logger as WinstonLogger } from '../lib/logger';

export function Logger(scope: string): ParameterDecorator {
  return (object, propertyKey, index): any => {
    const logger = new WinstonLogger(scope);
    const propertyName = propertyKey?.toString() || '';
    Container.registerHandler({
      object: object as any,
      propertyName,
      index,
      value: () => logger,
    });
  };
}

export { LoggerInterface } from '../lib/logger';
