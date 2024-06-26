import { Injectable, OnModuleDestroy, OnModuleInit, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';


@Injectable() // OnModuleInit 생략이나, 첫 번째 호출 지연 발생함
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // constructor(private readonly configService: ConfigService) {
    //     super({
    //         datasources: {
    //             db: {
    //                 url: configService.get('DATABASE_URL'),
    //             },
    //         },
    //     });
    // }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async enableShutdownHook(app: INestApplication) {
        process.on("beforeExit", async () => {
          await app.close()
        })
      }
}
