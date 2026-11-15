import { INestApplication } from '@nestjs/common';

/** Applies shared HTTP application configuration for runtime and e2e tests. */
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api/v1');
}
