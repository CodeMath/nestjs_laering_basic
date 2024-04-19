import {  Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid'; // v1 버전을 사용한다
import { CreateBoardDto } from './dto/create-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Board, Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
    constructor(  
        private prisma: PrismaService
    ){};

    async getAllBoards(): Promise<Board[] | null> {
        return await this.prisma.board.findMany(); 
    }

    async getBoardById(boardWhereUniqueInput: Prisma.BoardWhereUniqueInput): Promise<Board | never>{
        const found = await this.prisma.board.findUniqueOrThrow({
            where: boardWhereUniqueInput,
        }).catch(error =>{
            throw new NotFoundException(`${error}`);
        });
        
        return found;
    }

}
