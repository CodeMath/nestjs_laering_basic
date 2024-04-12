import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 글로벌로 설정
@Module({
  providers: [PrismaService],
  exports: [PrismaService] // 전역으로 사용 할
})
export class PrismaModule {}
