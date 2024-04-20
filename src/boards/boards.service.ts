import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid'; // v1 버전을 사용한다
import { CreateBoardDto } from './dto/create-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Board, Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
    constructor(
        private prisma: PrismaService
    ) { };

    async getAllBoards(): Promise<Board[] | null> {
        return await this.prisma.board.findMany();
    }

    async getBoardById(boardWhereUniqueInput: Prisma.BoardWhereUniqueInput): Promise<Board | never> {
        const found = await this.prisma.board.findUniqueOrThrow({
            where: boardWhereUniqueInput,
        }).catch(error => {
            throw new NotFoundException(`${error}`);
        });

        return found;
    }

    async createBoard(postData: CreateBoardDto): Promise<Board | never> {

        const new_board = await this.prisma.board.create({
            data: postData
        }).catch(error => {
            throw new BadRequestException(`${error}`);
        });

        return new_board;

    }

    async changeStatusBoard(id: string, status: string): Promise<Board> {
        const board = await this.getBoardById({id: id});
        if (board.status === status){
            return board;
        }else{           
            board.status = status;
        }
        const update_board = await this.prisma.board.update({
            where: board,
            data: board
        }).catch(error => {
            throw new BadRequestException(`${error}`);
        });

        return update_board;

    }

    async deleteBoard(id: string): Promise<void>{
        const board = await this.getBoardById({id: id});
        await this.prisma.board.delete({
            where: board
        });
    }
}
