import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './boards.models';
import { v1 as uuid } from 'uuid'; // v1 버전을 사용한다
import { CreateBoardDto } from './dto/create-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
    constructor(  
        private prisma: PrismaService
    ){};

    async getAllBoards(): Promise<Board[] | null> {
        return await this.prisma.board.findMany(); 
    }

}
