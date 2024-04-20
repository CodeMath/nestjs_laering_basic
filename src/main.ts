import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  ); // production 에서 세부 에러 메시지 숨김 
  const prisma: PrismaService = app.get(PrismaService); 
  prisma.enableShutdownHook(app);
  await app.listen(3000);
}
bootstrap();
