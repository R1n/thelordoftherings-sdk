import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
dotenv.config()

import { SdkModule } from './modules/sdk.module';
import { setupSwagger } from './swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(SdkModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return app.listen(process.env.PORT);
}

bootstrap()
    .then((app) => {
      if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
      }
    })
    .catch((error) => {
      console.error('Error bootstrapping application:', error);
    });
