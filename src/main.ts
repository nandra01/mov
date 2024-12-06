import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import * as auth from 'basic-auth';
declare const module: any;
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const nodeEnv = process.env.NODE_ENV || '';

const configEnv = dotenv.parse(fs.readFileSync(`${nodeEnv}.env`));
   if (configEnv) {
    app.use(['/api/v1/movie', '/api/v1/movie-json'], basicAuth({
      challenge: true,
      users: {
        [configEnv.SW_USER]: configEnv.SW_PASSWORD,
      }
    }))
 }
  const config = new DocumentBuilder()
    .setTitle('Movie Documentation')
    .setDescription('Movies description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/movie', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
    },
  });
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
