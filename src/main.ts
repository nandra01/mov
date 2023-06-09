import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
declare const module: any;

const SWAGGER_ENVS = ['local', 'development', 'production'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 console.log(SWAGGER_ENVS.includes(process.env.NODE_ENV) + '🥵');
  
   if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(['/api/v1/movie', '/api/v1/movie-json'], basicAuth({
      challenge: true,
      users: {
        [process.env.SW_USER]: process.env.SW_PASSWORD,
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
