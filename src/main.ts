import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';

async function main() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  // Prefijo para todas mis peticiones
  app.setGlobalPrefix('api');
  // Proteger cabeceras
  app.use(helmet());
  // Habilitar CORS
  app.enableCors();
  // Validar DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Inicializar Swagger
  initSwagger(app);
  // Configurar puerto
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3005;
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
main();
