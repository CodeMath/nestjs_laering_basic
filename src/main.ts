import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true,
  //   }),
  // ); // production 에서 세부 에러 메시지 숨김 
  const prisma: PrismaService = app.get(PrismaService);
  prisma.enableShutdownHook(app);
  const config = new DocumentBuilder()
    .setTitle("Board API")
    .setDescription("The Board API")
    .setVersion("1.0")
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
